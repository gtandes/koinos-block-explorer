"use client";

import { useState } from "react";
import { Button } from "@nextui-org/react";

import { Input } from "../ui/input";
import {
  getAccountHistory,
  getAcctTokenBalance,
} from "@/lib/utilFns/useGetAcctHistory";
import { transactionStore } from "@/store/TransactionStore";

export default function SearchComponent() {
  const {
    searchInput,
    setAddressSearch,
    setKoinBalance,
    setVHPBalance,
    setWethBalance,
    setAccountTransactionHistory,
  } = transactionStore();

  // const [input, setInput] = useState("");
  // const [error, setError] = useState(false);
  // const [errorMessage, setErrorMessage] = useState("");
  // const [loading, setLoading] = useState(false);

  const search = async () => {
    const acctHistSearchRes = await getAccountHistory(searchInput, 11);

    const koinInWallet = await getAcctTokenBalance(
      "15DJN4a8SgrbGhhGksSBASiSYjGnMU8dGL",
      searchInput
    );

    const vhpInWallet = await getAcctTokenBalance(
      "18tWNU7E4yuQzz7hMVpceb9ixmaWLVyQsr",
      searchInput
    );

    // console.log(acctHistSearchRes);

    setKoinBalance(koinInWallet);
    setVHPBalance(vhpInWallet);
    setAccountTransactionHistory(acctHistSearchRes);
  };

  return (
    <div className="w-full h-full flex items-center justify-center">
      <Input
        type="text"
        value={searchInput}
        onChange={(e) => setAddressSearch(e.target.value)}
        placeholder="Ron.Koin"
        className="w-[40%] text-almost-black mr-8"
      />

      <Button
        onClick={search}
        className="rounded bg-o flex flex-row items-center justify-center py-2 px-4 text-steelblue leading-[24px]"
      >
        Search
      </Button>

      {/* {loading && <p>Loading...</p>}
      {error && <p>Error: {errorMessage}</p>} */}
    </div>
  );
}
