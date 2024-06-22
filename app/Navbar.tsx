"use client";
import { DropdownMenu, Avatar, Button } from "@radix-ui/themes";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { AiFillBug } from "react-icons/ai";
import { useSession } from "next-auth/react";
import { LuLogOut } from "react-icons/lu";
const Navbar = () => {
  const currentPath = usePathname();
  const session = useSession();
  const links = [
    { label: "Dashboard", href: "/" },
    { label: "Issues", href: "/issues" },
  ];
  return (
    <nav className="flex p-3 justify-between  bg-zinc-200 w-full  ">
      <div className="flex items-center space-x-6">
        <Link href="/">
          <AiFillBug size={30} />
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
      {session?.status === "unauthenticated" && (
        <Button variant="soft">
          <Link href="api/auth/signin">Sign In</Link>
        </Button>
      )}
      {session?.status === "authenticated" && (
        <DropdownMenu.Root>
          <DropdownMenu.Trigger>
            <Avatar
              className=" cursor-pointer"
              src={session.data?.user?.image!}
              fallback="?"
            />
          </DropdownMenu.Trigger>
          <DropdownMenu.Content>
            <DropdownMenu.Item>
              Name : {session.data?.user?.name!}
            </DropdownMenu.Item>
            <DropdownMenu.Separator />
            <DropdownMenu.Item>
              <Link
                href="api/auth/signout"
                className="flex items-center justify-between gap-4"
              >
                <LuLogOut />
                Sign Out
              </Link>
            </DropdownMenu.Item>
          </DropdownMenu.Content>
        </DropdownMenu.Root>
      )}
    </nav>
  );
};

export default Navbar;
