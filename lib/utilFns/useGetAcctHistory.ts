import { Contract, Provider, interfaces, utils } from "koilib";
import { formatNumberWithCommas } from "./useFormatInput";

const provider = new Provider(["https://api.koinos.io"]);

export type BlockReceiptJson = {
  id?: string;
  height?: string;
  disk_storage_used?: string;
  network_bandwidth_used?: string;
  compute_bandwidth_used?: string;
  state_merkle_root?: string;
  events?: interfaces.EventData[];
  token_events: string[];
  transaction_receipts?: interfaces.TransactionReceipt[];
  logs?: string[];
  disk_storage_charged?: string;
  network_bandwidth_charged?: string;
  compute_bandwidth_charged?: string;
  amount?: string;
};

export type TransactionReceiptJson = {
  timestamp: string;
  id: string;
  payer: string;
  max_payer_rc: string;
  rc_limit: string;
  rc_used: string;
  disk_storage_used: string;
  network_bandwidth_used: string;
  compute_bandwidth_used: string;
  reverted: boolean;
  events: interfaces.EventData[];
  token_events: string[];
  logs: string[];
  amount?: string;
};

export type HistoryRecord = {
  seq_num?: string;
  trx?: {
    transaction: interfaces.TransactionJson;
    receipt: TransactionReceiptJson;
  };
  block?: {
    header: interfaces.BlockHeaderJson;
    receipt: BlockReceiptJson;
  };

  koinPrice?: number;
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
  acctId?: string
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

  return formatNumberWithCommas(Number(formattedBalance).toFixed(2));
};

export const getManaPercent = async (acctId: string) => {
  const koinInWallet = await getAcctTokenBalance(
    "15DJN4a8SgrbGhhGksSBASiSYjGnMU8dGL",
    acctId
  );

  const manaAvailable = await provider.getAccountRc(acctId);

  const manaPercent = (
    Number(manaAvailable) /
    Number(koinInWallet) /
    1000000
  ).toFixed(2);

  return manaPercent;
};
