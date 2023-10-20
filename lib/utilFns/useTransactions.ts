import { Provider, interfaces } from "koilib";
import { HistoryRecord } from "./useGetAcctHistory";

const provider = new Provider(["https://api.koinos.io"]);
// const provider = new Provider(["https://harbinger-api.koinos.io"]);

const cache = new Map<string, { expiration: number; timestamp: string }>();

export const getTransactionsTimestamps = async (
  historyRecords: HistoryRecord[]
): Promise<HistoryRecord[]> => {
  // iterate over history records
  for (let index = 0; index < historyRecords.length; index++) {
    const historyRec = historyRecords[index];

    if (historyRec.trx) {
      historyRec.trx.receipt.timestamp = await getTransactionTimestamp(
        historyRecords[index].trx?.transaction.id!
      );
    }
  }

  return historyRecords;
};

export const getTransactionTimestamp = async (
  transactionId: string
): Promise<string> => {
  const cacheObj = cache.get(transactionId);

  if (cacheObj && cacheObj.expiration > new Date().getTime()) {
    return cacheObj.timestamp;
  }

  const response = await provider.getTransactionsById([transactionId]);

  if (!response.transactions.length) {
    return "";
  }

  const [transaction] = response.transactions;

  const blocks = await provider.call<{
    block_items: {
      block_id: string;
      block_height: string;
      block: interfaces.BlockJson;
      receipt: {
        transaction_receipts: interfaces.TransactionReceipt[];
      };
    }[];
  }>("block_store.get_blocks_by_id", {
    return_block: true,
    return_receipt: false,
    block_ids: [transaction.containing_blocks[0]],
  });

  if (blocks.block_items.length) {
    cache.set(transactionId, {
      timestamp: blocks.block_items[0].block?.header!.timestamp!,
      expiration: new Date().getTime() + 3600000,
    });

    return blocks.block_items[0].block.header!.timestamp!;
  }

  return "";
};
