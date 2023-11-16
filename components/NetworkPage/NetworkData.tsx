import { FC } from "react";
import {
  getNetworkHeight,
  getBurned,
  consultGeneralInfo,
} from "@/lib/utilFns/useNetwork";
import { Contract, Provider, utils } from "koilib";
import { formatNumberWithCommas } from "@/lib/utilFns/useFormatInput";
import { useSearchTrxRecords } from "@/lib/react-query/queries";
import { HistoryRecord } from "@/lib/utilFns/useGetAcctHistory";

type NetworkDataProps = {};

const NetworkData: FC<NetworkDataProps> = async ({}) => {
  const provider = new Provider(["https://api.koinos.io"]);
  const burnedAmount = await getBurned();
  const networkHeight = await getNetworkHeight();
  const { koinClaimed } = await consultGeneralInfo();

  const koinContract = new Contract({
    id: "15DJN4a8SgrbGhhGksSBASiSYjGnMU8dGL",
    abi: utils.tokenAbi,
    provider,
  });

  const { data, isFetched, isFetching } = useSearchTrxRecords();

  const lastKoinPrice = data?.find(
    (transaction: HistoryRecord) => true
  )?.koinPrice;

  const koin = koinContract.functions;
  const { result: totalKoin } = await koin.balanceOf();
  const totalKoinValue = totalKoin?.value ? parseFloat(totalKoin.value) : 0;

  let marketcap;

  if (lastKoinPrice !== undefined) {
    marketcap = (lastKoinPrice * totalKoinValue) / 100;
  }

  return (
    <div className="leading-[24px] text-left inline-block w-[100px] h-[89px]">
      <p className="m-0">{networkHeight}</p>
      <p className="m-0">{koinClaimed}</p>
      <p className="m-0 w-[100px]">
        ${formatNumberWithCommas(marketcap!.toFixed(0))}
      </p>
      <p className="m-0">{burnedAmount}</p>
    </div>
  );
};

export default NetworkData;
