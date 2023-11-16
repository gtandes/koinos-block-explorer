import {
  WalletConnectModalSign,
  WalletConnectModalSignOptions,
} from "@walletconnect/modal-sign-html";

import { getSdkError } from "@walletconnect/utils";

import { Contract, Provider, utils, Signer } from "koilib";
import { generateSigner } from "./useSigner";
import { generateProvider } from "./useProvider";

export enum ChainIds {
  Mainnet = "koinos:EiBZK_GGVP0H_fXVAM3j6EAuz3-B-l3e",
  Harbinger = "koinos:EiAAKqFi-puoXnuJTdn7qBGGJa8yd-dc",
}

export enum Methods {
  SignMessage = "koinos_signMessage",
  SignHash = "koinos_signHash",
  SignTransaction = "koinos_signTransaction",
  SignAndSendTransaction = "koinos_signAndSendTransaction",
  PrepareTransaction = "koinos_prepareTransaction",
  WaitForTransaction = "koinos_waitForTransaction",
  JsonRpcCall = "koinos_JsonRpcCall",
  GetNonce = "koinos_getNonce",
  GetNextNonce = "koinos_getNextNonce",
  GetAccountRc = "koinos_getAccountRc",
  GetTransactionsById = "koinos_getTransactionsById",
  GetBlocksById = "koinos_getBlocksById",
  GetHeadInfo = "koinos_getHeadInfo",
  GetChainId = "koinos_getChainId",
  GetBlocks = "koinos_getBlocks",
  GetBlock = "koinos_getBlock",
  SendTransaction = "koinos_sendTransaction",
  ReadContract = "koinos_readContract",
  SubmitBlock = "koinos_submitBlock",
}

export enum LogLevel {
  "none",
  "debug",
}

export type Options = {
  logLevel?: LogLevel;
};

export class WalletConnectKoinos {
  public web3Modal: WalletConnectModalSign;
  private topic = "";
  private chainId: string | undefined;
  private accounts: string[] = [];
  private options: Options = {
    logLevel: LogLevel.none,
  };

  constructor(
    WalletConnectModalSignOptions: WalletConnectModalSignOptions,
    options?: Options
  ) {
    if (options) {
      this.options = options;
    }
    this.web3Modal = new WalletConnectModalSign(WalletConnectModalSignOptions);

    this.web3Modal.onSessionDelete((ev) => this.onSessionDelete(ev));
  }

  close(): void {
    this.web3Modal.offSessionDelete((ev) => this.onSessionDelete(ev));
  }

  async onSessionDelete(data: { id: number; topic: string }): Promise<void> {
    if (this.options.logLevel === LogLevel.debug) {
      console.log("onSessionDelete", data);
    }

    this.accounts = [];
    this.topic = "";
    this.chainId = undefined;
  }

  async connect(chains: ChainIds[], methods: Methods[]): Promise<string[]> {
    this.accounts = [];
    // check if there is an existing session
    // we want to keep only 1 session
    const sessions = await this.web3Modal.getSessions();
    let session = sessions.length ? sessions[0] : undefined;

    if (!session) {
      // open WC modal if no existing session
      session = await this.web3Modal.connect({
        requiredNamespaces: {
          koinos: {
            methods: methods,
            chains: chains,
            events: [],
          },
        },
      });
    }

    if (!session) {
      return [];
    }

    // populate the topic from the session
    this.topic = session.topic;

    // if only one chain was selected for this session, populate chainId
    if (session.namespaces.koinos.chains?.length === 1) {
      this.chainId = session.namespaces.koinos.chains[0];
    }

    const accounts: string[] = session.namespaces.koinos.accounts.reduce(
      (acc: string[], acct) => {
        const [_namespace, _chainId, address] = acct.split(":");

        if (!acc.includes(address)) {
          acc.push(address);
        }

        return acc;
      },
      []
    );

    this.accounts = accounts;
    return accounts;
  }

  async disconnect(): Promise<void> {
    // for now, disconnect from all sessions
    const sessions = await this.web3Modal.getSessions();

    for (const session of sessions) {
      try {
        this.web3Modal.disconnect({
          topic: session.topic,
          reason: getSdkError("USER_DISCONNECTED"),
        });
      } catch (error) {
        console.error(error);
      }

      // and pairings
      if (session.pairingTopic) {
        try {
          this.web3Modal.disconnect({
            topic: session.pairingTopic,
            reason: getSdkError("USER_DISCONNECTED"),
          });
        } catch (error) {
          console.error(error);
        }
      }
    }

    this.accounts = [];
  }

  getAccounts(): string[] {
    return this.accounts;
  }

  getSigner(address: string, provider?: Provider, chainId?: ChainIds): Signer {
    const finalChainId = chainId || this.chainId;
    if (!finalChainId) {
      throw new Error(
        "You must provide a chain id because none or several are present in this session."
      );
    }

    return generateSigner(
      address,
      finalChainId,
      this.topic,
      this.web3Modal,
      provider
    );
  }

  getProvider(chainId?: ChainIds): Provider {
    const finalChainId = chainId || this.chainId;
    if (!finalChainId) {
      throw new Error(
        "You must provide a chain id because none or several are present in this session."
      );
    }
    return generateProvider(finalChainId, this.topic, this.web3Modal);
  }
}

// async function onConnect(): Promise<void> {
//   try {
//     connectButton.disabled = true;
//     accounts = await walletConnectKoinos.connect(
//       [ChainIds.Harbinger, ChainIds.Mainnet],
//       [Methods.SignMessage, Methods.SignTransaction]
//     );
//     console.info(accounts);
//     accountsInfo.value = JSON.stringify(accounts, null, 2);
//   } catch (err) {
//     console.error(err);
//     alert((err as Error).message);
//   } finally {
//     connectButton.disabled = false;
//   }
// }

// async function onDisconnect(): Promise<void> {
//   try {
//     disconnectButton.disabled = true;
//     await walletConnectKoinos.disconnect();
//   } catch (err) {
//     console.error(err);
//     alert((err as Error).message);
//   } finally {
//     disconnectButton.disabled = false;
//   }
// }

function getNetworkSelection(): ChainIds {
  const networkSelection = (
    document.querySelector('input[name="network"]:checked') as HTMLInputElement
  )?.value;
  console.log(networkSelection);

  return networkSelection === "testnet" ? ChainIds.Harbinger : ChainIds.Mainnet;
}

// async function onSignMessage(): Promise<void> {
//   try {
//     signMessageButton.disabled = true;
//     const network = getNetworkSelection();

//     const signer = walletConnectKoinos.getSigner(
//       accounts[0],
//       undefined,
//       network
//     );
//     const signature = await signer.signMessage(messageInput.value);
//     messageSignatureInput.value = utils.encodeBase64url(signature);
//   } catch (err) {
//     console.error(err);
//     alert((err as Error).message);
//   } finally {
//     signMessageButton.disabled = false;
//   }
// }

// async function onSignTransaction(): Promise<void> {
//   try {
//     signTransactionButton.disabled = true;
//     const network = getNetworkSelection();
//     const jsonRPCUrl =
//       network === ChainIds.Harbinger
//         ? "https://harbinger-api.koinos.io"
//         : "https://api.koinos.io";

//     const provider = new Provider(jsonRPCUrl);
//     const signer = walletConnectKoinos.getSigner(
//       accounts[0],
//       provider,
//       network
//     );

//     const koinContractId =
//       network === ChainIds.Harbinger
//         ? "1FaSvLjQJsCJKq5ybmGsMMQs8RQYyVv8ju"
//         : "15DJN4a8SgrbGhhGksSBASiSYjGnMU8dGL";
//     console.log(network);
//     // get Koin balance
//     const koin = new Contract({
//       id: koinContractId,
//       abi: utils.tokenAbi,
//       signer,
//     });

//     const { transaction } = await koin.functions.transfer(
//       {
//         from: signer.getAddress(),
//         to: toInput.value,
//         value: utils.parseUnits(amountInput.value, 8),
//       },
//       {
//         sendTransaction: false,
//       }
//     );

//     signedTransaction.value = JSON.stringify(transaction, null, 2);
//   } catch (err) {
//     console.error(err);
//     alert((err as Error).message);
//   } finally {
//     signTransactionButton.disabled = false;
//   }
// }
