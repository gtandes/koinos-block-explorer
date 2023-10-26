"use client";

import { FC, useEffect, useState } from "react";
import { DownloadIcon, UploadIcon } from "lucide-react";
import { Button, Progress, ScrollShadow } from "@nextui-org/react";
import { useInView } from "react-intersection-observer";

import { formatKoinosAddress } from "@/lib/utilFns/useFormatInput";

import {
  HistoryRecord,
  getAccountHistory,
  getAcctTokenBalance,
  getManaPercent,
} from "@/lib/utilFns/useGetAcctHistory";

import { transactionStore } from "@/store/TransactionStore";
import { deserializeEvents } from "@/lib/utilFns/useDeserializer";
import { getTransactionsTimestamps } from "@/lib/utilFns/useTransactions";
import { useInfiniteQuery } from "@tanstack/react-query";

type BlockHistoryProps = {};

const BlockHistory: FC<BlockHistoryProps> = ({}) => {
  const { ref, inView } = useInView();

  const {
    accountTransactionHistory,
    searchInput,
    setAccountTransactionHistory,
  } = transactionStore();

  // const {
  //   data,
  //   status,
  //   error,
  //   fetchNextPage,
  //   isFetchingNextPage,
  //   hasNextPage,
  // } = useInfiniteQuery({
  //   queryKey: ["blockRecords"],
  //   queryFn: () => {},
  //   initialPageParam: 1,
  //   getNextPageParam: (lastPage, allPages) => {
  //     const nextPage = lastPage.length ? allPages.length + 1 : undefined;
  //     return nextPage;
  //   },
  // });

  // useEffect(() => {
  //   if (inView && hasNextPage) {
  //     console.log("Fire!");
  //     fetchNextPage();
  //   }
  // }, [inView, hasNextPage, fetchNextPage]);

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
      {accountTransactionHistory.length <= 20 && (
        <div className="max-w-md mt-20">
          Retrieving mint/burn history...
          <Progress
            aria-label="Retrieving Transactions..."
            size="md"
            value={value}
            color="success"
            className="max-w-md"
          />
        </div>
      )}

      <div className="h-[50vh] overflow-y-auto flex flex-col items-start justify-start box-border gap-[8px] text-left text-sm text-success-400 font-inter">
        <ScrollShadow className="w-full h-full">
          {accountTransactionHistory
            ?.filter((item: HistoryRecord) => item.block)
            .map((transaction: HistoryRecord, index) => {
              return (
                <div
                  key={transaction.block?.receipt.id || index}
                  className={`flex items-start justify-start text-left text-sm text-success-400 font-inter my-1 first:mt-1 last:mb-1`}
                >
                  <div className="rounded-lg [background:linear-gradient(180deg,_rgba(0,_0,_0,_0.5),_rgba(0,_0,_0,_0.5))] box-border w-[1038px] flex flex-col items-start justify-start py-3.5 px-[15px] border-[0.1px] border-solid border-transparent">
                    <div className="self-stretch flex items-center justify-between">
                      <div className="flex flex-col items-center justify-start gap-[4px]">
                        <div className="w-[220px] flex items-start justify-start gap-[8px]">
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

                          <p className="relative leading-[24px] font-light font-inter text-gray text-right inline-block w-[170px] shrink-0">
                            {transaction.block?.header?.timestamp
                              ? new Date(
                                  parseInt(
                                    transaction.block?.header?.timestamp!
                                  )
                                ).toLocaleString()
                              : ""}
                          </p>
                        </div>

                        {/* <Button
                        onPress={() => {
                          setAddressSearch(
                            `${transaction.trx?.transaction.header?.payer}`
                          );

                          search();
                        }}
                        className="self-stretch flex items-start justify-start gap-[8px] text-2xs text-white font-inter leading-[24px] font-light bg-transparent h-[25px] w-[90px] p-0 m-0"
                      >
                        {`From: `}
                        {formatKoinosAddress(searchInput)}
                      </Button> */}
                      </div>

                      <div className="h-[26px] flex text-center text-3xs text-o rounded bg-almost-black items-center justify-center py-[3px] px-2 border-[1px] border-solid border-transparent leading-[10px] font-medium">
                        Tx {transaction.block?.receipt.id}
                      </div>

                      <div className="flex flex-col items-start justify-start text-right text-xl text-white w-[200px]">
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
      {accountTransactionHistory &&
        accountTransactionHistory?.filter((item: HistoryRecord) => item.block)
          .length === 0 && (
          <h1 className="text-white z-10">
            There is no block data for this address yet.
          </h1>
        )}
    </>
  );
};

export default BlockHistory;
