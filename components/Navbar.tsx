"use client";

import { Button } from "@nextui-org/react";
import Image from "next/image";
import Link from "next/link";
import { FC } from "react";
import SearchComponent from "./LandingPage/_Searchbar";

type NavbarProps = {};

const Navbar: FC<NavbarProps> = ({}) => {
  return (
    <section className="fixed top-0 left-0 right-0 w-full h-20 flex items-center justify-between py-4 px-8 box-border text-center text-base text-white font-inter bg-almost-black z-10 ">
      <Image
        src={"/logo.svg"}
        alt="Odyssius Logo"
        className="sm:block hidden"
        width={146.32}
        height={26}
      />

      <SearchComponent />

      <nav className="items-center justify-end gap-[32px] hidden sm:flex">
        <Link
          href="/"
          className="relative [text-decoration:underline] leading-[24px] text-o-yellow cursor-pointer font-bold"
        >
          Search
        </Link>

        <Link
          href="/"
          className="relative [text-decoration:underline] leading-[24px]"
        >
          Network
        </Link>

        <Link
          href="/"
          className="relative [text-decoration:underline] leading-[24px]"
        >
          Directory
        </Link>

        <Button className="rounded bg-o flex flex-row items-center justify-center py-2 px-4 text-steelblue leading-[24px]">
          ron.koin
        </Button>
      </nav>
    </section>
  );
};

export default Navbar;
