"use client";

import NetworkData from "@/components/NetworkPage/NetworkData";
import { walletConnectStore } from "@/store/WalletConnectStore";
import { NextPage } from "next";
import { redirect } from "next/navigation";
import { useLayoutEffect } from "react";

const Page: NextPage = () => {
  const { connectedAccount } = walletConnectStore();

  useLayoutEffect(() => {
    if (!connectedAccount) {
      redirect("/");
    }
  }, [connectedAccount]);

  return (
    <section className="relative flex flex-col items-center justify-center z-[5] w-full h-[100vh] overflow-hidden">
      <div className="flex flex-col items-center justify-start text-right text-base text-o font-inter mt-[-20rem]">
        <h1 className="leading-[24px] font-thin text-[60px] py-16">Network</h1>

        <div className="flex justify-between relative w-[213px] h-6">
          <div className="leading-[24px] inline-block w-[100px]">
            <p className="m-0">Block height:</p>
            <p className="m-0">Claimed:</p>
            <p className="m-0">Market Cap:</p>
            <p className="m-0">Burned:</p>
          </div>

          <NetworkData />
        </div>
      </div>
    </section>
  );
};

export default Page;
