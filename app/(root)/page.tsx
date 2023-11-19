"use client";

import SearchComponent from "@/components/SearchPage/Searchbar";
import { walletConnectStore } from "@/store/WalletConnectStore";

export default function Page() {
  const { connectedAccount } = walletConnectStore();

  return (
    <div className="relative z-[5] flex flex-col items-center justify-center w-full h-[100vh] overflow-hidden">
      {!!connectedAccount && <SearchComponent />}
    </div>
  );
}
