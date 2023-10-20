import { FC } from "react";
import { getNetworkHeight, getBurned } from "@/lib/utilFns/useNetwork";

type NetworkDataProps = {};

const NetworkData: FC<NetworkDataProps> = async ({}) => {
  const burnedAmount = await getBurned();
  const networkHeight = await getNetworkHeight();

  return (
    <div className="leading-[24px] text-left inline-block w-[100px] h-[89px]">
      <p className="m-0">{networkHeight}</p>
      <p className="m-0">Pending BE</p>
      <p className="m-0">Pending BE</p>
      <p className="m-0">{burnedAmount}</p>
    </div>
  );
};

export default NetworkData;
