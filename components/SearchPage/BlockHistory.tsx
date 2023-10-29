"use client";

import { FC, useEffect, useState } from "react";
import { DownloadIcon, UploadIcon } from "lucide-react";
import { Button, Progress, ScrollShadow } from "@nextui-org/react";

import { formatKoinosAddress } from "@/lib/utilFns/useFormatInput";

import { HistoryRecord } from "@/lib/utilFns/useGetAcctHistory";

import { transactionStore } from "@/store/TransactionStore";
import { useSearchBlockRecords } from "@/lib/react-query/queries";

type BlockHistoryProps = {};

const BlockHistory: FC<BlockHistoryProps> = ({}) => {
  const { accountTransactionHistory, searchInput } = transactionStore();

  const { data, isFetched, isFetching, refetch } = useSearchBlockRecords();

  // progress bar
  const [value, setValue] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setValue((v) => (v >= 100 ? 0 : v + 10));
    }, 500);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {isFetching && (
        <div className="max-w-md my-20">
          Fetching burn/mint records...
          <Progress
            aria-label="Fetching burn/mint records..."
            size="md"
            value={value}
            color="success"
            className="max-w-md"
          />
        </div>
      )}

      {isFetched && !isFetching && (
        <div className="h-[50vh] overflow-y-auto overflow-x-hidden flex flex-col items-center justify-center box-border gap-[8px] text-left text-sm text-success-400 font-inter mb-4 sm:mb-0">
          <ScrollShadow className="w-full h-full">
            {accountTransactionHistory
              ?.filter((item: HistoryRecord) => item.block)
              .map((transaction: HistoryRecord, index) => {
                return (
                  <div
                    key={transaction.block?.receipt.id || index}
                    className={`flex items-start justify-start text-left text-sm text-success-400 font-inter my-1 first:mt-1 last:mb-1`}
                  >
                    <div className="rounded-lg [background:linear-gradient(180deg,_rgba(0,_0,_0,_0.5),_rgba(0,_0,_0,_0.5))] box-border w-[330px] sm:w-[1038px] flex flex-col items-start justify-start py-3.5 px-[15px] border-[0.1px] border-solid border-transparent">
                      <div className="self-stretch flex items-center justify-between">
                        <div className="flex flex-col items-center justify-start gap-[4px]">
                          <div className="w-[110px] sm:w-[220px] flex items-start justify-start gap-[8px]">
                            <div className="relative leading-[24px]">
                              {transaction.block?.receipt.token_events.map(
                                (event, index) => (
                                  <div key={index}>
                                    {event.includes("+") ? (
                                      <DownloadIcon />
                                    ) : (
                                      <UploadIcon className="text-red-400" />
                                    )}
                                  </div>
                                )
                              )}
                            </div>

                            <p className="relative hidden sm:flex leading-[24px] font-light font-inter text-gray text-right sm:w-[170px] shrink-0">
                              {transaction.block?.header?.timestamp
                                ? new Date(
                                    parseInt(
                                      transaction.block?.header?.timestamp!
                                    )
                                  ).toLocaleString()
                                : ""}
                            </p>
                          </div>

                          <Button
                            onPress={() => {
                              // setAddressSearch(
                              //   `${transaction.trx?.transaction.header?.payer}`
                              // );

                              refetch();
                            }}
                            className="self-stretch flex items-start justify-start gap-[8px] text-2xs text-white font-inter leading-[24px] font-light bg-transparent h-[25px] w-[90px] p-0 m-0"
                          >
                            {`From: `}
                            {formatKoinosAddress(searchInput)}
                          </Button>
                        </div>

                        <div className="h-[26px] flex text-center text-3xs text-o rounded bg-almost-black items-center justify-center py-[3px] px-2 border-[1px] border-solid border-transparent leading-[10px] font-medium">
                          <p className="hidden sm:flex">
                            Tx {transaction.block?.receipt.id}
                          </p>

                          <p className="flex sm:hidden">
                            Tx{" "}
                            {transaction.block?.receipt.id &&
                              formatKoinosAddress(
                                transaction.block?.receipt.id
                              )}
                          </p>
                        </div>

                        <div className="flex flex-col items-start justify-start text-right text-xl text-white w-[110px] sm:w-[200px]">
                          <p className="relative leading-[24px] font-medium inline-block w-full">
                            {transaction.block?.receipt.token_events}
                          </p>
                          <p className="relative text-sm leading-[24px] font-light text-gray inline-block w-full">
                            ${transaction.block?.receipt.amount}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
          </ScrollShadow>
        </div>
      )}

      {!isFetching &&
        data &&
        data?.filter((item: HistoryRecord) => item.block).length === 0 && (
          <h1 className="text-white z-10 mb-4">
            There is no block data for this address yet.
          </h1>
        )}
    </>
  );
};

export default BlockHistory;
