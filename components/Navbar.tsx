"use client";

import Image from "next/image";
import Link from "next/link";
import { FC, ReactNode, useEffect } from "react";
import { usePathname } from "next/navigation";
import { SearchIcon } from "lucide-react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Kbd,
  useDisclosure,
} from "@nextui-org/react";
import SearchComponent from "./SearchPage/Searchbar";
import WalletConnectBtn from "./WalletConnectBtn";
import { walletConnectStore } from "@/store/WalletConnectStore";

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
  const pathname = usePathname();
  const homeRoute = pathname === "/";

  const { connectedAccount } = walletConnectStore();
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "q" && (event.ctrlKey || event.metaKey)) {
        onOpen();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onOpen]);

  return (
    <section className="fixed top-0 left-0 right-0 w-full h-20 flex items-center justify-between py-4 px-8 box-border text-center text-base text-white font-inter z-10 backdrop-blur-sm">
      <Link href="/">
        <div className="flex flex-col items-start justify-center mt-3">
          <Image
            src={"/logo.svg"}
            alt="Odyssius Logo"
            className="sm:flex hidden"
            width={146.32}
            height={26}
          />

          <Image
            src={"/o.svg"}
            alt="O Logo"
            className="flex sm:hidden"
            width={50}
            height={50}
          />

          <div className="relative leading-[24px] text-xs text-gray sm:flex hidden">
            A simplified block explorer for the Koinos blockchain
          </div>
        </div>
      </Link>

      <nav className="items-center justify-end gap-[32px] flex">
        {!!connectedAccount && <ActiveLink href="/network">Network</ActiveLink>}

        {!homeRoute && (
          <div className="flex items-center justify-center">
            <Button
              onClick={onOpen}
              // variant="bordered"
              className="flex items-center px-2 justify-between border-o bg-transparent"
              startContent={
                <SearchIcon className="text-white/90  pointer-events-none flex-shrink-0 w-5 h-5" />
              }
              endContent={<Kbd keys={["ctrl"]}>Q</Kbd>}
            >
              <p className="text-white hidden sm:flex">Quick Search</p>
            </Button>

            <Modal
              backdrop="blur"
              isOpen={isOpen}
              onOpenChange={onOpenChange}
              size="2xl"
            >
              <ModalContent className="flex items-center justify-center h-[30%] bg-almost-black  border-o overflow-hidden">
                {() => (
                  <>
                    <ModalHeader />
                    <ModalBody></ModalBody>
                    <SearchComponent onClose={onClose} />
                  </>
                )}
              </ModalContent>
            </Modal>
          </div>
        )}

        <WalletConnectBtn />
      </nav>
    </section>
  );
};

export default Navbar;
