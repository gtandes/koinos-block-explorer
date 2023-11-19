"use client";

import { FC } from "react";
import { formatNumberWithCommas } from "@/lib/utilFns/useFormatInput";
import { HistoryRecord } from "@/lib/utilFns/useGetAcctHistory";
import {
  useCoinGeckoKoinPrice,
  useGetBurned,
  useGetKoinClaimed,
  useGetNetworkHeight,
  useGetTotalKoinValue,
  useSearchTrxRecords,
} from "@/lib/react-query/queries";

type NetworkDataProps = {};

const NetworkData: FC<NetworkDataProps> = ({}) => {
  const { data: burnedAmount } = useGetBurned();
  const { data: networkHeight } = useGetNetworkHeight();
  const { data: koinClaimed } = useGetKoinClaimed();
  const { data: totalKoinValue } = useGetTotalKoinValue();
  // const { data: coinGeckoKoinPrice } = useCoinGeckoKoinPrice();
  const { data } = useSearchTrxRecords();

  const lastKoinPrice = data?.find(
    (transaction: HistoryRecord) => true
  )?.koinPrice;

  let marketcap;
  console.log(totalKoinValue);
  console.log(lastKoinPrice);

  if (lastKoinPrice !== undefined && totalKoinValue !== undefined) {
    marketcap = (lastKoinPrice * totalKoinValue) / 100;
  }

  console.log(marketcap);

  return (
    <div className="leading-[24px] text-left inline-block w-[100px] h-[89px]">
      <p className="m-0">{networkHeight}</p>

      <p className="m-0">{koinClaimed?.koinClaimed}</p>

      <p className="m-0 w-[100px]">
        {marketcap !== undefined
          ? `$${formatNumberWithCommas(marketcap.toFixed(0))}`
          : "Not available"}
      </p>

      <p className="m-0">{burnedAmount}</p>
    </div>
  );
};

export default NetworkData;
