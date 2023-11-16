"use client";

import { FC, useState } from "react";

import {
  ChainIds,
  LogLevel,
  Methods,
  WalletConnectKoinos,
} from "@/lib/utilFns/useWalletConnect";

import { Button } from "@nextui-org/react";

type WalletConnectBtnProps = {};

const WalletConnectBtn: FC<WalletConnectBtnProps> = ({}) => {
  const projectId = process.env.NEXT_PUBLIC_WALLETCONNECT_ID;
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  if (!projectId) {
    throw new Error("You need to provide a WALLETCONNECT_ID env variable");
  }

  const WalletConnectInstance = new WalletConnectKoinos(
    {
      projectId,
      metadata: {
        name: "Web3Modal",
        description: "Web3Modal",
        url: "web3modal.com",
        icons: [
          "https://walletconnect.com/_next/static/media/logo_mark.84dd8525.svg",
        ],
      },
      modalOptions: {
        explorerRecommendedWalletIds: "NONE",
        enableExplorer: false,
        walletImages: {
          portal: "https://portal.armana.io/favicon.png",
        },
        mobileWallets: [
          {
            id: "portal",
            name: "Portal",
            links: {
              native: "portal://",
              universal: "https://portal.armana.io",
            },
          },
        ],
      },
    },
    {
      logLevel: LogLevel.debug,
    }
  );

  let accounts: string[] = [];

  async function onConnect(): Promise<void> {
    try {
      setIsButtonDisabled(true);
      accounts = await WalletConnectInstance.connect(
        [ChainIds.Harbinger, ChainIds.Mainnet],
        [Methods.SignMessage, Methods.SignTransaction]
      );
      console.info(accounts);
    } catch (err) {
      console.error(err);
      // alert((err as Error).message);
    } finally {
      setIsButtonDisabled(false);
    }
  }

  async function onDisconnect(): Promise<void> {
    try {
      setIsButtonDisabled(true);
      await WalletConnectInstance.disconnect();
    } catch (err) {
      console.error(err);
      alert((err as Error).message);
    } finally {
      setIsButtonDisabled(false);
    }
  }

  return (
    <Button onClick={onConnect} disabled={isButtonDisabled}>
      Connect
    </Button>
  );
};

export default WalletConnectBtn;
