import { FC } from "react";
import { getNetworkHeight, getBurned } from "@/lib/utilFns/useNetwork";
// import { useQuery } from "@tanstack/react-query";
import { mexcKoinLastPrice } from "@/lib/utilFns/useMEXC";
import { Contract, Provider, utils } from "koilib";
import { formatNumberWithCommas } from "@/lib/utilFns/useFormatInput";

type NetworkDataProps = {};

const NetworkData: FC<NetworkDataProps> = async ({}) => {
  const provider = new Provider(["https://api.koinos.io"]);
  const burnedAmount = await getBurned();
  const networkHeight = await getNetworkHeight();

  const koinContract = new Contract({
    id: "15DJN4a8SgrbGhhGksSBASiSYjGnMU8dGL",
    abi: utils.tokenAbi,
    provider,
  });

  const koin = koinContract.functions;
  const { result: totalKoin } = await koin.balanceOf();
  const totalKoinValue = totalKoin?.value ? parseFloat(totalKoin.value) : 0;

  const marketcap = (mexcKoinLastPrice * totalKoinValue) / 100;

  return (
    <div className="leading-[24px] text-left inline-block w-[100px] h-[89px]">
      <p className="m-0">{networkHeight}</p>
      <p className="m-0">Pending BE</p>
      <p className="m-0 w-[100px]">
        ${formatNumberWithCommas(marketcap.toFixed(0))}
      </p>
      <p className="m-0">{burnedAmount}</p>
    </div>
  );
};

export default NetworkData;
