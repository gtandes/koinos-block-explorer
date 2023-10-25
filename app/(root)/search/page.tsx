"use client";

import { Switch } from "@nextui-org/react";

import AcctOwnerInfo from "@/components/SearchPage/AcctOwnerInfo";
import TokenCountCard from "@/components/SearchPage/TokenCountCard";
import TotalBalanceCard from "@/components/SearchPage/TotalBalanceCard";
import TransactionHistory from "@/components/SearchPage/TransactionHistory";
import { transactionStore } from "@/store/TransactionStore";
import BlockHistory from "@/components/SearchPage/BlockHistory";
import { BlocksIcon, CandlestickChartIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export default function page() {
  const { switchHistoryRecord, isSwitchSelected } = transactionStore();

  return (
    <section className="relative z-[5] flex flex-col items-center justify-start w-full h-[100vh] overflow-hidden backdrop-blur-sm">
      <div className="flex justify-between items-center w-[1038px]">
        <AcctOwnerInfo />

        <div className="flex items-center justify-end gap-[24px] ">
          {isSwitchSelected ? "Block Data" : "Transaction Data"}

          <Switch
            color="success"
            isSelected={isSwitchSelected}
            onValueChange={switchHistoryRecord}
            startContent={<BlocksIcon />}
            endContent={<CandlestickChartIcon />}
          />
        </div>
      </div>

      <div className="flex items-center justify-start gap-[24px] text-left text-base text-white font-inter mb-4">
        <TotalBalanceCard />
        <TokenCountCard />
      </div>

      {isSwitchSelected ? <BlockHistory /> : <TransactionHistory />}
    </section>
  );
}
