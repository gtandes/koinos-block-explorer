"use client";

import { ChangeEvent, useState } from "react";
import { Button } from "@nextui-org/react";

import { Input } from "../ui/input";
import {
  getAccountHistory,
  getAcctTokenBalance,
  getManaPercent,
} from "@/lib/utilFns/useGetAcctHistory";
import { transactionStore } from "@/store/TransactionStore";
import Link from "next/link";

export default function SearchComponent() {
  const {
    searchInput,
    setAddressSearch,
    setKoinBalance,
    setVHPBalance,
    setWethBalance,
    setAccountTransactionHistory,
    setManaPercentBalance,
  } = transactionStore();

  const search = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    const acctHistSearchRes = await getAccountHistory(searchInput, 21);

    const koinInWallet = await getAcctTokenBalance(
      "15DJN4a8SgrbGhhGksSBASiSYjGnMU8dGL",
      searchInput
    );

    const vhpInWallet = await getAcctTokenBalance(
      "18tWNU7E4yuQzz7hMVpceb9ixmaWLVyQsr",
      searchInput
    );

    const manaPerc = await getManaPercent(searchInput);

    setKoinBalance(koinInWallet);
    setVHPBalance(vhpInWallet);
    setAccountTransactionHistory(acctHistSearchRes);
    setManaPercentBalance(manaPerc);

    // setAddressSearch("");
  };

  const DynamicWidthInput = () => {
    const inputWidth = `${searchInput.length}ch`;

    return (
      <Input
        type="text"
        value={searchInput}
        onChange={(e) => setAddressSearch(e.target.value)}
        placeholder="Ron.Koin"
        className="rounded min-w-[15rem] w-[35%] overflow-hidden text-center py-8 border-b-[1px] border-solid border-gray leading-[24px] bg-transparent text-o mb-8 text-2xl font-bold placeholder-center"
        style={{ width: inputWidth }}
      />
    );
  };

  return (
    <div className="w-full h-full flex flex-col items-center justify-center">
      <DynamicWidthInput />

      <Button
        onClick={search}
        className="rounded bg-o flex flex-col items-center justify-center px-8 py-7 text-center text-2xl text-almost-black font-inter leading-[24px] font-medium"
      >
        <Link href={"/search"}>Search</Link>
      </Button>
    </div>
  );
}
