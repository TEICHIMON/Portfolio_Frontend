// Navbar.jsx
"use client";

import Link from "next/link";
import React, { useState } from "react";
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
  const [isMobileMenuOpen, setMobileMenuOpen] =
    useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <div className="h-24 flex justify-between items-center">
      <Link
        href="/"
        className="font-bold text-2xl"
      >
        Sudami
      </Link>
      <div className="hidden md:flex items-center gap-5">
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
      <div className="md:hidden">
        <button
          className="px-2 py-1 border-none bg-[#53c28b] text-white cursor-pointer rounded"
          onClick={toggleMobileMenu}
        >
          {isMobileMenuOpen ? "Close" : "Menu"}
        </button>
      </div>
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-24 right-0 bg-white dark:bg-gray-800 py-2 px-4 shadow-lg rounded">
          <DarkModeToggle />
          {links.map((link) => (
            <Link
              key={link.id}
              href={link.url}
              className="block py-2"
              onClick={toggleMobileMenu}
            >
              {link.title}
            </Link>
          ))}
          {isAuthenticated && (
            <button
              className="block w-full text-left py-2 border-none bg-[#53c28b] text-white cursor-pointer rounded"
              onClick={() => {
                clearUser();
                toggleMobileMenu();
              }}
            >
              Logout
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default Navbar;
