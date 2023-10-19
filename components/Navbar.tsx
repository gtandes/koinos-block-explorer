"use client";

import { Button } from "@nextui-org/react";
import Image from "next/image";
import Link from "next/link";
import { FC, ReactNode } from "react";
import { usePathname } from "next/navigation";

type ActiveLinkProps = {
  href: string;
  children: ReactNode;
};

const ActiveLink = ({ href, children }: ActiveLinkProps) => {
  const pathname = usePathname();
  const isActive = pathname === href;

  const linkClasses = `relative leading-[24px] [text-decoration:underline] cursor-pointer ${
    isActive ? "text-o-yellow font-bold" : ""
  }`;

  return (
    <Link href={href} className={linkClasses}>
      {children}
    </Link>
  );
};

type NavbarProps = {};

const Navbar: FC<NavbarProps> = ({}) => {
  return (
    <section className="fixed top-0 left-0 right-0 w-full h-20 flex items-center justify-between py-4 px-8 box-border text-center text-base text-white font-inter z-10 backdrop-blur-sm">
      <Link href="/">
        <div className="flex flex-col items-start justify-center mt-3">
          <Image
            src={"/logo.svg"}
            alt="Odyssius Logo"
            className="sm:block hidden"
            width={146.32}
            height={26}
          />

          <div className="relative leading-[24px] text-xs text-gray">
            A simplified block explorer for the Koinos blockchain
          </div>
        </div>
      </Link>

      <nav className="items-center justify-end gap-[32px] hidden sm:flex">
        <ActiveLink href="/search">Search</ActiveLink>
        <ActiveLink href="/network">Network</ActiveLink>

        {/* <Link
          href="/"
          className="relative leading-[24px] text-o-yellow cursor-pointer font-bold"
        >
          Search
        </Link>

        <Link
          href={href}
          className="relative [text-decoration:underline] leading-[24px]"
        >
          Network
        </Link> */}

        <Button className="rounded bg-o flex flex-row items-center justify-center py-2 px-4 text-steelblue leading-[24px]">
          <Link href="/dump">Dump</Link>
        </Button>
      </nav>
    </section>
  );
};

export default Navbar;
