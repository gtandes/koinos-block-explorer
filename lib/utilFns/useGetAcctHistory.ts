import { transactionStore } from "@/store/TransactionStore";
import { Contract, Provider, interfaces, utils } from "koilib";

const provider = new Provider(["https://api.koinos.io"]);
// const provider = new Provider(["https://harbinger-api.koinos.io"]);

export type BlockReceiptJson = {
  id?: string;
  height?: string;
  disk_storage_used?: string;
  network_bandwidth_used?: string;
  compute_bandwidth_used?: string;
  state_merkle_root?: string;
  events?: interfaces.EventData[];
  transaction_receipts?: interfaces.TransactionReceipt[];
  logs?: string[];
  disk_storage_charged?: string;
  network_bandwidth_charged?: string;
  compute_bandwidth_charged?: string;
};

export type HistoryRecord = {
  seq_num?: string;
  trx?: {
    transaction: interfaces.TransactionJson;
    receipt: interfaces.TransactionReceipt;
  };
  block?: {
    header: interfaces.BlockHeaderJson;
    receipt: BlockReceiptJson;
  };
};

export async function getAccountHistory(
  account: string,
  limit: number,
  seqNum?: string,
  ascending = false,
  irreversible = false
): Promise<HistoryRecord[]> {
  const { values } = await provider!.call<{
    values?: HistoryRecord[];
  }>("account_history.get_account_history", {
    address: account,
    limit,
    ascending,
    irreversible,
    ...(seqNum && { seq_num: seqNum }),
  });

  if (!values) {
    return [];
  }

  return values;
}

export const getAcctTokenBalance = async (
  contractId: string,
  acctId: string
) => {
  const koinContract = new Contract({
    id: contractId,
    abi: utils.tokenAbi,
    provider,
  });

  const koin = koinContract.functions;

  // Get balance
  const { result: balanceRes } = await koin.balanceOf({
    owner: acctId,
  });

  // Get decimals
  const { result: decimalsRes } = await koin.decimals();

  const formattedBalance = utils.formatUnits(
    balanceRes?.value,
    decimalsRes?.value
  );

  return formattedBalance;
};

export const getManaPercent = async (acctId: string) => {
  const koinInWallet = await getAcctTokenBalance(
    "15DJN4a8SgrbGhhGksSBASiSYjGnMU8dGL",
    acctId
  );

  const manaAvailable = await provider.getAccountRc(acctId);
  const manaPercent = Number(manaAvailable) / Number(koinInWallet) / 1000000;
  console.log("====================================");
  console.log(manaAvailable, manaPercent);
  console.log("====================================");
  return manaPercent;
};

export const getNetworkHeight = async () => {
  // explore the promise that this returns; topology has the height of the entire network
  // await provider.getHeadInfo();
};
