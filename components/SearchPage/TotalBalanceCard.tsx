"use client";

import { transactionStore } from "@/store/TransactionStore";
import { FC } from "react";
import { HistoryRecord } from "@/lib/utilFns/useGetAcctHistory";

type TotalBalanceCardProps = {};

const TotalBalanceCard: FC<TotalBalanceCardProps> = ({}) => {
  const { manaPercentBalance, koinBalance, accountTransactionHistory } =
    transactionStore();

  // const koinPrice = accountTransactionHistory.map(
  //   (transaction: HistoryRecord, index) => {
  //     if (index === 0) {
  //       return transaction.koinPrice;
  //     }
  //     return null; // Return null for other iterations
  //   }
  // );

  const lastKoinPrice = accountTransactionHistory
    .map((transaction: HistoryRecord) => {
      return transaction.koinPrice;
    })
    .find(() => true);

  return (
    <div className="rounded-lg [background:linear-gradient(180deg,_rgba(0,_0,_0,_0.5),_rgba(0,_0,_0,_0.5))] box-border w-[330px] h-40 flex flex-col items-start justify-start p-4 gap-[8px] text-left text-base text-white font-inter border-[0.1px] border-solid border-transparent">
      <div className="self-stretch flex flex-row items-start justify-between">
        <p className="relative leading-[24px] font-light inline-block w-[145px] shrink-0">
          Koin Balance
        </p>

        <p className="relative leading-[24px] font-light text-gray text-right">
          {manaPercentBalance}% Mana
        </p>
      </div>

      <p className="w-[300px] h-24 flex justify-center items-center text-21xl font-bold">
        $ {(Number(koinBalance) * Number(lastKoinPrice)).toFixed(2)}
        {/* $  {(Number(koinBalance) * Number(koinPrice[0])).toFixed(2)} */}
      </p>
    </div>
  );
};

export default TotalBalanceCard;
