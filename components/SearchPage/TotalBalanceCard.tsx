"use client";

import { transactionStore } from "@/store/TransactionStore";
import { FC } from "react";
import {
  HistoryRecord,
  getAcctTokenBalance,
  getManaPercent,
} from "@/lib/utilFns/useGetAcctHistory";
import { useQuery } from "@tanstack/react-query";
import { Spinner } from "@nextui-org/react";
import { useSearchTrxRecords } from "@/lib/react-query/queries";

type TotalBalanceCardProps = { className?: string };

const TotalBalanceCard: FC<TotalBalanceCardProps> = ({ className }) => {
  const { searchInput } = transactionStore();

  const {
    data: koinData,
    isFetching: isFetchingKoin,
    isFetched: isKoinFetched,
  } = useQuery({
    queryKey: ["koinBalance"],
    queryFn: async () => {
      const koinInWallet = await getAcctTokenBalance(
        "15DJN4a8SgrbGhhGksSBASiSYjGnMU8dGL",
        searchInput
      );

      return koinInWallet;
    },
  });

  const {
    data: manaData,
    isFetching: isFetchingMana,
    isFetched: isManaFetched,
  } = useQuery({
    queryKey: ["tokenBalances"],
    queryFn: async () => {
      const manaPercentBalance = await getManaPercent(searchInput);

      return manaPercentBalance;
    },
  });

  const { data, isFetched, isFetching } = useSearchTrxRecords();

  const lastKoinPrice = data?.find(
    (transaction: HistoryRecord) => true
  )?.koinPrice;

  return (
    <div
      className={`rounded-lg [background:linear-gradient(180deg,_rgba(0,_0,_0,_0.5),_rgba(0,_0,_0,_0.5))] box-border w-[330px] h-[20vh] flex flex-col items-start justify-start p-4 gap-[8px] text-left text-base text-white font-inter border-[0.1px] border-solid border-transparent ${className}`}
    >
      <div className="self-stretch flex flex-row items-start justify-between">
        <p className="relative leading-[24px] font-light inline-block w-[145px] shrink-0">
          Koin Balance
        </p>

        <p className="relative leading-[24px] font-light text-gray text-right">
          {isFetchingMana && <Spinner color="success" size="sm" />}

          {isManaFetched &&
            !isFetchingMana &&
            manaData !== undefined &&
            `${manaData}% Mana`}
        </p>
      </div>

      <p className="w-[300px] h-24 flex justify-center items-center text-21xl font-bold">
        {(isFetching || isFetchingKoin) && (
          <Spinner color="success" size="lg" />
        )}

        {isKoinFetched &&
          isFetched &&
          !isFetchingKoin &&
          lastKoinPrice !== undefined &&
          `${"$ "} ${(Number(koinData) * lastKoinPrice).toFixed(2)}`}
      </p>
    </div>
  );
};

export default TotalBalanceCard;
