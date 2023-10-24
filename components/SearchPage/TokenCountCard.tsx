"use client";

import { transactionStore } from "@/store/TransactionStore";
import { FC } from "react";

type TokenCountCardProps = {};

const TokenCountCard: FC<TokenCountCardProps> = ({}) => {
  const { koinBalance, vhpBalance } = transactionStore();

  return (
    <div className="rounded-lg [background:linear-gradient(180deg,_rgba(0,_0,_0,_0.5),_rgba(0,_0,_0,_0.5))] box-border w-[684px] h-40 flex flex-col items-start justify-start p-4 gap-[16px] text-left text-base text-white font-inter border-[0.1px] border-solid border-transparent">
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
          <div className="relative text-sm leading-[24px]">{koinBalance}</div>
        </div>

        <div className="self-stretch flex flex-row items-center justify-between border-b-[0.1px] border-solid border-gray mr-2">
          <div className="relative leading-[24px] font-light">VHP</div>
          <div className="relative text-sm leading-[24px]">{vhpBalance}</div>
        </div>
        {/* <div className="self-stretch flex flex-row items-center justify-between border-b-[0.1px] border-solid border-gray mr-2">
          <div className="relative leading-[24px] font-light">wETH</div>
          <div className="relative text-sm leading-[24px]">99,999,999</div>
        </div>
        <div className="self-stretch flex flex-row items-center justify-between border-b-[0.1px] border-solid border-gray mr-2">
          <div className="relative leading-[24px] font-light">Koinos</div>
          <div className="relative text-sm leading-[24px]">99,999,999</div>
        </div>
        <div className="self-stretch flex flex-row items-center justify-between border-b-[0.1px] border-solid border-gray mr-2">
          <div className="relative leading-[24px] font-light">Koinos</div>
          <div className="relative text-sm leading-[24px]">99,999,999</div>
        </div> */}
      </div>
    </div>
  );
};

export default TokenCountCard;
