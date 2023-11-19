"use client";

import { FC, useEffect, useState } from "react";

import {
  ChainIds,
  LogLevel,
  Methods,
  WalletConnectKoinos,
} from "@armana/walletconnect-koinos-sdk-js";

import { Button } from "@nextui-org/react";
import { walletConnectStore } from "@/store/WalletConnectStore";

type WalletConnectBtnProps = {};

const WalletConnectBtn: FC<WalletConnectBtnProps> = ({}) => {
  const projectId = process.env.NEXT_PUBLIC_WALLETCONNECT_ID;
  const whitelistedAccounts =
    process.env.NEXT_PUBLIC_WHITELISTED_ACCOUNTS?.split(",") || [];

  const { connectedAccount, setConnectedAccount } = walletConnectStore();
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

  // const [accounts, setAccounts] = useState<string[]>([]);
  let accounts: string[] = [];

  // useEffect(() => {
  //   if (accounts.length > 0) {
  //     window.location.reload();
  //   }
  // }, [accounts]);

  async function onConnect(): Promise<void> {
    try {
      setIsButtonDisabled(true);
      accounts = await WalletConnectInstance.connect(
        [ChainIds.Harbinger, ChainIds.Mainnet],
        [Methods.SignMessage, Methods.SignTransaction]
      );

      // const accounts = await WalletConnectInstance.connect(
      //   [ChainIds.Harbinger, ChainIds.Mainnet],
      //   [Methods.SignMessage, Methods.SignTransaction]
      // );

      // setAccounts(accounts);

      console.log("Whitelist:", whitelistedAccounts);
      console.log("Account:", accounts[0]);
      console.log("Is whitelisted:", whitelistedAccounts.includes(accounts[0]));

      if (accounts.length > 0) {
        const isConnectedAccountWhitelisted = whitelistedAccounts.includes(
          accounts[0]
        );

        if (!isConnectedAccountWhitelisted) {
          throw new Error("The connected account is not whitelisted.");
        }

        setConnectedAccount(accounts[0]);
        // console.log("Whitelisted account connected:", accounts[0]);
      } else {
        throw new Error("There was an error connecting.");
      }
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
      setConnectedAccount("");
    } catch (err) {
      console.error(err);
      alert((err as Error).message);
    } finally {
      setConnectedAccount("");

      setIsButtonDisabled(false);
    }
  }

  return (
    <div className="container flex items-center justify-center gap-x-4">
      <Button onClick={onConnect} disabled={isButtonDisabled}>
        {"Connect"}
      </Button>

      <Button onClick={onDisconnect} disabled={isButtonDisabled}>
        {"Disconnect"}
      </Button>
    </div>
  );
};

export default WalletConnectBtn;
