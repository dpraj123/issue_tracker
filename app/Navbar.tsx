"use client";
import { Button, DropdownMenu } from "@radix-ui/themes";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { AiFillBug } from "react-icons/ai";
import { useSession } from "next-auth/react";

const Navbar = () => {
  const currentPath = usePathname();
  const session = useSession();
  console.log(session);
  const links = [
    { label: "Dashboard", href: "/" },
    { label: "Issues", href: "/issues" },
  ];
  return (
    <nav className="flex p-3 justify-between bg-zinc-200 w-full  ">
      <div className="flex items-center space-x-6">
        <Link href="/">
          <AiFillBug size={40} />
        </Link>
        <ul className="flex gap-5">
          {links?.map((item) => (
            <li key={item?.label}>
              <Link
                className={` text-xl font-bold hover:text-blue-800 ${
                  item.href === currentPath ? " text-blue-800" : `text-gray-500`
                }`}
                href={item?.href}
              >
                {item?.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <DropdownMenu.Root>
        <DropdownMenu.Trigger>
          <Button>
            DP <DropdownMenu.TriggerIcon />
          </Button>
        </DropdownMenu.Trigger>
        <DropdownMenu.Content>
          <DropdownMenu.Item shortcut="⌘ E">Sign Out</DropdownMenu.Item>
          <DropdownMenu.Separator />
          <DropdownMenu.Item shortcut="⌘ D">Name</DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Root>
    </nav>
  );
};

export default Navbar;
