"use client";

import { transactionStore } from "@/store/TransactionStore";
import { FC } from "react";

type TotalBalanceCardProps = {};

const TotalBalanceCard: FC<TotalBalanceCardProps> = ({}) => {
  const { manaPercentBalance } = transactionStore();

  return (
    <div className="rounded-lg [background:linear-gradient(180deg,_rgba(0,_0,_0,_0.5),_rgba(0,_0,_0,_0.5))] box-border w-[330px] h-40 flex flex-col items-start justify-start p-4 gap-[8px] text-left text-base text-white font-inter border-[0.1px] border-solid border-o">
      <div className="self-stretch flex flex-row items-start justify-between">
        <div className="relative leading-[24px] font-light inline-block w-[145px] shrink-0">
          Balance
        </div>

        <div className="relative leading-[24px] font-light text-gray text-right">
          {manaPercentBalance}% Mana
        </div>
      </div>

      <div className="w-[300px] h-24 flex justify-center items-center text-21xl font-bold">
        $99,999,999
      </div>
    </div>
  );
};

export default TotalBalanceCard;
