import {
  getNetworkHeight,
  getBurned,
  // consultGeneralInfo,
} from "@/lib/utilFns/useNetwork";

export default function page() {
  const burnedAmount = getBurned();
  const networkHeight = getNetworkHeight();
  // const { koinClaimed } = async () => await consultGeneralInfo();

  return (
    <section className="relative flex flex-col items-center justify-center z-[5] w-full h-[100vh] overflow-hidden">
      <div className="flex flex-col items-center justify-start text-right text-base text-o font-inter mt-[-20rem]">
        <h1 className="leading-[24px] font-thin text-[60px] py-16">Network</h1>

        <div className="flex justify-between relative w-[213px] h-6">
          <div className="leading-[24px] inline-block w-[100px]">
            <p className="m-0">Block height:</p>
            <p className="m-0">Claimed:</p>
            <p className="m-0">Market Cap:</p>
            <p className="m-0">{`Burned: `}</p>
          </div>

          <div className="leading-[24px] text-left inline-block w-[100px] h-[89px]">
            <p className="m-0">{networkHeight}</p>
            <p className="m-0">Pending Backend Integration</p>
            <p className="m-0">100,000,000</p>
            <p className="m-0">{burnedAmount}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
