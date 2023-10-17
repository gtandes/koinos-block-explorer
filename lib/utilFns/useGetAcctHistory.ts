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
  // const { selectedNetwork } = useNetworksStore();

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
  const { result } = await koin.balanceOf({
    owner: acctId,
  });

  console.log(result);

  return result?.value;
};
