"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { AiFillBug } from "react-icons/ai";

const Navbar = () => {
  const currentPath = usePathname();
  const links = [
    { label: "Dashboard", href: "/" },
    { label: "Issues", href: "/issues" },
  ];
  return (
    <nav className="flex px-5 space-x-6 h-14 border-2 border-slate-400 items-center bg-zinc-100 ">
      <Link href="/">
        <AiFillBug />
      </Link>
      <ul className="flex gap-5">
        {links?.map((item) => (
          <li key={item?.label}>
            <Link
              className={`${
                item.href === currentPath
                  ? "text-blue-500"
                  : `text-zinc-500 hover:text-zinc-800`
              }`}
              href={item?.href}
            >
              {item?.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navbar;
