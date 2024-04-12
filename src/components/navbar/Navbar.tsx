// Navbar.jsx
"use client";

import Link from "next/link";
import React from "react";
import DarkModeToggle from "../DarkModeToggle/DarkModeToggle";
import { useAuthStore } from "@/store/store";

const links = [
  {
    id: 1,
    title: "Home",
    url: "/",
  },
  {
    id: 2,
    title: "Portfolio",
    url: "/portfolio",
  },
  {
    id: 3,
    title: "Blog",
    url: "/blog",
  },
  {
    id: 4,
    title: "About",
    url: "/about",
  },
  {
    id: 5,
    title: "Contact",
    url: "/contact",
  },
  {
    id: 6,
    title: "Dashboard",
    url: "/dashboard",
  },
];

const Navbar = () => {
  const { user, isAuthenticated, clearUser } =
    useAuthStore();

  return (
    <div className="h-24 flex justify-between items-center">
      <Link
        href="/"
        className="font-bold text-2xl"
      >
        Sudami
      </Link>
      <div className="flex items-center gap-5">
        <DarkModeToggle />
        {links.map((link) => (
          <Link key={link.id} href={link.url}>
            {link.title}
          </Link>
        ))}
        {isAuthenticated && (
          <button
            className="px-2 py-1 border-none bg-[#53c28b] text-white cursor-pointer rounded"
            onClick={() => clearUser()}
          >
            Logout
          </button>
        )}
      </div>
    </div>
  );
};

export default Navbar;
