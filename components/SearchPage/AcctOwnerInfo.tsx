"use client";

import { FC } from "react";
import { formatKoinosAddress } from "@/lib/utilFns/useFormatInput";
import { transactionStore } from "@/store/TransactionStore";

type AcctOwnerInfoProps = {};

const AcctOwnerInfo: FC<AcctOwnerInfoProps> = ({}) => {
  const { searchInput } = transactionStore();

  return (
    <div className="flex flex-row items-center justify-between gap-[16px] text-center text-5xl text-o font-inter my-8 sm:my-6">
      <div className="hidden sm:flex sm:leading-[24px]">{searchInput}</div>
      <div className="sm:hidden">{formatKoinosAddress(searchInput)}</div>

      <div className="rounded bg-almost-gray flex flex-row items-center justify-center py-px px-2 text-left text-xs border-[1px] border-solid border-transparent">
        <p className="relative leading-[24px] font-medium">ron.koin</p>
      </div>
    </div>
  );
};

export default AcctOwnerInfo;
