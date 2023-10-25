"use client";

import { transactionStore } from "@/store/TransactionStore";
import { FC } from "react";

type AcctOwnerInfoProps = {};

const AcctOwnerInfo: FC<AcctOwnerInfoProps> = ({}) => {
  const { searchInput } = transactionStore();

  return (
    <div className="flex items-start justify-start gap-[16px] text-center text-5xl text-o font-inter my-6">
      <div className="leading-[24px]">{searchInput}</div>

      <div className="rounded bg-almost-gray flex flex-row items-center justify-center py-px px-2 text-left text-xs border-[1px] border-solid border-transparent">
        <div className="relative leading-[24px] font-medium">ron.koin</div>
      </div>
    </div>
  );
};

export default AcctOwnerInfo;
