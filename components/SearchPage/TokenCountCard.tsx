"use client";

import { getAcctTokenBalance } from "@/lib/utilFns/useGetAcctHistory";
import { transactionStore } from "@/store/TransactionStore";
import { Skeleton, Spinner } from "@nextui-org/react";
import { useQuery } from "@tanstack/react-query";
import { FC } from "react";

type TokenCountCardProps = { className?: string };

const TokenCountCard: FC<TokenCountCardProps> = ({ className }) => {
  const { searchInput } = transactionStore();

  const { data, error, isFetching, isLoading } = useQuery({
    queryKey: ["tokenBalances"],
    queryFn: async () => {
      const koinInWallet = await getAcctTokenBalance(
        "15DJN4a8SgrbGhhGksSBASiSYjGnMU8dGL",
        searchInput
      );

      const vhpInWallet = await getAcctTokenBalance(
        "18tWNU7E4yuQzz7hMVpceb9ixmaWLVyQsr",
        searchInput
      );

      // console.log(koinInWallet, vhpInWallet);
      return { koinInWallet, vhpInWallet };
    },
  });

  return (
    <div
      className={`rounded-lg [background:linear-gradient(180deg,_rgba(0,_0,_0,_0.5),_rgba(0,_0,_0,_0.5))] box-border w-[684px] h-[20vh] flex flex-col items-start justify-start p-4 gap-[16px] text-left text-base text-white font-inter border-[0.1px] border-solid border-transparent ${className}`}
    >
      <div className="flex flex-row items-start justify-start gap-[2px]">
        <div className="flex flex-row items-start justify-start border-b-[2px] border-solid border-o-yellow">
          <div className="relative leading-[24px] font-light inline-block w-[145px] shrink-0">
            Tokens
          </div>
        </div>
        <div className="flex flex-row items-start justify-start text-gray border-b-[1px] border-solid border-gray">
          <div className="relative leading-[24px] font-light inline-block w-[145px] shrink-0">
            NFTs
          </div>
        </div>
      </div>

      <div className="self-stretch h-[90px] overflow-y-auto shrink-0 flex flex-col items-start justify-start gap-[4px] text-2xs">
        <div className="self-stretch flex flex-row items-center justify-between border-b-[0.1px] border-solid border-gray mr-2">
          <div className="relative leading-[24px] font-light">Koinos</div>
          {isFetching ? (
            <Spinner color="success" size="sm" />
          ) : (
            data && (
              <div className="relative text-sm leading-[24px]">
                {data.koinInWallet}
              </div>
            )
          )}
        </div>

        <div className="self-stretch flex flex-row items-center justify-between border-b-[0.1px] border-solid border-gray mr-2">
          <div className="relative leading-[24px] font-light">VHP</div>
          {isFetching ? (
            <Spinner color="success" size="sm" />
          ) : (
            data && (
              <div className="relative text-sm leading-[24px]">
                {data?.vhpInWallet}
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default TokenCountCard;
