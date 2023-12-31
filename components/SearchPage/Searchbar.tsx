"use client";

import { FC } from "react";
import Link from "next/link";
import { Button } from "@nextui-org/react";
import { usePathname } from "next/navigation";

import { Input } from "../ui/input";
import { transactionStore } from "@/store/TransactionStore";

type SearchComponentProps = { onClose?: () => void };

const SearchComponent: FC<SearchComponentProps> = ({ onClose }) => {
  const pathname = usePathname();
  const homeRoute = pathname === "/";
  const searchRoute = pathname === "/search";

  const { searchInput, setAddressSearch } = transactionStore();

  const DynamicWidthInput = () => {
    const inputWidth = `${searchInput.length}ch`;

    return (
      <Input
        type="text"
        value={searchInput}
        onChange={(e) => setAddressSearch(e.target.value)}
        placeholder="Ron.Koin"
        className="rounded min-w-[15rem] max-w-[80vw] md:w-[35%] overflow-hidden text-center py-8 border-b-[1px] border-solid border-gray leading-[24px] bg-transparent text-o mb-8 text-2xl font-bold placeholder-center "
        style={{ width: inputWidth }}
      />
    );
  };

  return (
    <div className="w-full h-full flex flex-col items-center justify-center -mt-40">
      <DynamicWidthInput />

      <Button
        onClick={() => {
          !homeRoute && onClose?.();
        }}
        className="rounded bg-o flex flex-col items-center justify-center px-8 py-7 text-center text-2xl text-almost-black font-inter leading-[24px] font-medium"
      >
        {searchRoute ? "Search" : <Link href={"/search"}>Search</Link>}
      </Button>
    </div>
  );
};

export default SearchComponent;
