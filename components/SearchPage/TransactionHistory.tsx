"use client";

import { FC } from "react";
import { formatKoinosAddress } from "@/lib/utilFns/useFormatInput";
import { HistoryRecord } from "@/lib/utilFns/useGetAcctHistory";
import { transactionStore } from "@/store/TransactionStore";
import { DownloadIcon, UploadIcon } from "lucide-react";

type TransactionHistoryProps = {};

const TransactionHistory: FC<TransactionHistoryProps> = () => {
  const { accountTransactionHistory } = transactionStore();
  console.log(accountTransactionHistory);

  return (
    <div className="left-[193px] h-[400px] overflow-y-auto flex flex-col items-start justify-start box-border gap-[8px] text-left text-sm text-success-400 font-inter">
      {accountTransactionHistory.map((transaction: HistoryRecord) => (
        <div
          key={transaction.trx?.transaction.id}
          className="flex items-start justify-start text-left text-sm text-success-400 font-inter"
        >
          <div className="rounded-lg [background:linear-gradient(180deg,_rgba(0,_0,_0,_0.5),_rgba(0,_0,_0,_0.5))] box-border w-[1038px] flex flex-col items-start justify-start py-3.5 px-[15px] border-[0.1px] border-solid border-o">
            <div className="self-stretch flex items-center justify-between">
              <div className="flex flex-col items-center justify-start gap-[4px]">
                <div className="w-[212.5px] flex items-start justify-start gap-[8px]">
                  <div className="relative leading-[24px]">
                    {transaction.trx?.receipt.token_events.map((event, index) =>
                      event.includes("+") ? (
                        <DownloadIcon key={index} />
                      ) : (
                        <UploadIcon key={index} className="text-red-400" />
                      )
                    )}
                  </div>
                  <p className="relative leading-[24px] font-light font-inter text-gray text-right inline-block w-[160px] shrink-0">
                    {new Date(
                      parseInt(transaction.trx!.receipt.timestamp)
                    ).toLocaleString()}
                  </p>
                </div>

                <p className="self-stretch flex items-start justify-start gap-[8px] text-2xs text-white font-inter leading-[24px] font-light">
                  {`From: `}
                  {transaction.trx?.transaction.header?.payer &&
                    formatKoinosAddress(
                      transaction.trx.transaction.header.payer
                    )}
                </p>
              </div>

              <div className="h-[26px] flex text-center text-3xs text-o rounded bg-almost-black items-center justify-center py-[3px] px-2 border-[1px] border-solid border-o leading-[10px] font-medium">
                Tx {transaction.trx?.transaction.id}
              </div>

              <div className="flex flex-col items-start justify-start text-right text-xl text-white w-[220px]">
                <p className="relative leading-[24px] font-medium inline-block w-full">
                  {transaction.trx?.receipt.token_events}
                </p>
                <p className="relative text-sm leading-[24px] font-light text-gray inline-block w-full">
                  $99,999,999
                </p>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TransactionHistory;
