import { getBurned } from "@/lib/utilFns/useNetwork";

export default function page() {
  const burnedAmount = getBurned();

  return (
    <section className="relative flex flex-col items-center justify-center bg-almost-black w-full h-[100vh] overflow-hidden">
      <div className="flex flex-col items-center justify-start text-right text-base text-o font-inter mt-[-20rem]">
        <h1 className="leading-[24px] font-thin text-[60px] py-16">Network</h1>

        <div className="flex justify-between relative w-[213px] h-6">
          <div className="leading-[24px] inline-block w-[100px]">
            <p className="m-0">Block height:</p>
            <p className="m-0">Claimed:</p>
            <p className="m-0">Market Cap:</p>
            <p className="m-0">
              {`Burned: `}
              {/* {burnedAmount} */}
            </p>
          </div>

          <div className="leading-[24px] text-left inline-block w-[100px] h-[89px]">
            <p className="m-0">2,393</p>
            <p className="m-0">54,393,000</p>
            <p className="m-0">100,000,000</p>
            <p className="m-0">23,093,021</p>
          </div>
        </div>
      </div>
    </section>
  );
}
