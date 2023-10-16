"use client";

import { FC, useState } from "react";
import {
  Navbar as NextNavbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  Button,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
  Input,
  Dropdown,
  DropdownTrigger,
  Avatar,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/react";

import { SearchIcon } from "./svgs/SearchIcon";
import {
  ChevronDown,
  Scale,
  Lock,
  Activity,
  Flash,
  Server,
  TagUser,
} from "./svgs/Icons";
import Image from "next/image";

type NavbarProps = {};

const Navbar: FC<NavbarProps> = ({}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const menuItems = [
    "Profile",
    "Dashboard",
    "Activity",
    "Analytics",
    "System",
    "Deployments",
    "My Settings",
    "Team Settings",
    "Help & Feedback",
    "Log Out",
  ];

  const icons = {
    chevron: (
      <ChevronDown
        fill="currentColor"
        size={16}
        height={undefined}
        width={undefined}
      />
    ),
    scale: (
      <Scale
        className="text-warning"
        fill="currentColor"
        size={30}
        height={undefined}
        width={undefined}
      />
    ),
    lock: (
      <Lock
        className="text-success"
        fill="currentColor"
        size={30}
        height={undefined}
        width={undefined}
      />
    ),
    activity: (
      <Activity
        className="text-secondary"
        fill="currentColor"
        size={30}
        height={undefined}
        width={undefined}
      />
    ),
    flash: (
      <Flash
        className="text-primary"
        fill="currentColor"
        size={30}
        height={undefined}
        width={undefined}
      />
    ),
    server: (
      <Server
        className="text-success"
        fill="currentColor"
        size={30}
        height={undefined}
        width={undefined}
      />
    ),
    user: (
      <TagUser
        className="text-danger"
        fill="currentColor"
        size={30}
        height={undefined}
        width={undefined}
      />
    ),
  };

  return (
    <NextNavbar
      // classNames={{
      //   item: [
      //     "flex",
      //     "relative",
      //     "h-full",
      //     "items-center",
      //     "data-[active=true]:after:content-['']",
      //     "data-[active=true]:after:absolute",
      //     "data-[active=true]:after:bottom-0",
      //     "data-[active=true]:after:left-0",
      //     "data-[active=true]:after:right-0",
      //     "data-[active=true]:after:h-[2px]",
      //     "data-[active=true]:after:rounded-[2px]",
      //     "data-[active=true]:after:bg-primary",
      //   ],
      // }}

      shouldHideOnScroll
      isBordered
      onMenuOpenChange={setIsMenuOpen}
      maxWidth="full"
      position="sticky"
    >
      <div className="flex w-full items-center justify-between">
        <NavbarContent>
          <NavbarMenuToggle
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            className="sm:hidden"
          />

          <NavbarBrand>
            <Image
              src={"/logo.svg"}
              alt="Odyssius Logo"
              className="sm:block hidden"
              width={146.32}
              height={26}
            />
            {/* <Image
            src={"/o.svg"}
            alt="O Logo"
            className="font-bold text-inherit block sm:hidden"
          /> */}
          </NavbarBrand>
        </NavbarContent>

        <div className="flex items-center justify-end">
          <NavbarContent className="hidden sm:flex gap-6 pr-6" justify="center">
            <NavbarItem>
              <Link href="#" aria-current="page" className="underline">
                Search
              </Link>
            </NavbarItem>

            <NavbarItem>
              <Link href="#" aria-current="page" className="underline">
                Network
              </Link>
            </NavbarItem>

            <NavbarItem>
              <Link color="foreground" href="#" className="underline">
                Directory
              </Link>
            </NavbarItem>
          </NavbarContent>

          <NavbarContent justify="end">
            <NavbarItem>
              <Button as={Link} color="success" href="#" variant="solid">
                Connect
              </Button>
            </NavbarItem>
          </NavbarContent>
        </div>

        <NavbarMenu>
          {menuItems.map((item, index) => (
            <NavbarMenuItem key={`${item}-${index}`}>
              <Link
                color={
                  index === 2
                    ? "primary"
                    : index === menuItems.length - 1
                    ? "danger"
                    : "foreground"
                }
                className="w-full"
                href="#"
                size="lg"
              >
                {item}
              </Link>
            </NavbarMenuItem>
          ))}
        </NavbarMenu>
      </div>
    </NextNavbar>
  );
};

export default Navbar;
