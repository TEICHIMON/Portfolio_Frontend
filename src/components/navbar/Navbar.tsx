"use client";
import Link from "next/link";
import React, {
  useEffect,
  useState,
} from "react";
import DarkModeToggle from "../DarkModeToggle/DarkModeToggle";
import { useAuthStore } from "@/store/store";
import { Locale } from "@/app/[lang]/dictionaries";
import { useDictionary } from "@/components/DictionaryProvider/DictionaryProvider";
import {
  usePathname,
  useRouter,
} from "next/navigation";
import { router } from "next/client";

const Languages: Locale[] = ["en", "ja"];

export default function Navbar() {
  const { lang, isAuthenticated, clearUser } =
    useAuthStore();
  const [isMobileMenuOpen, setMobileMenuOpen] =
    useState(false);
  const pathname = usePathname();
  const router = useRouter();
  let result = pathname.split("/");
  const [selectedLang, setSelectedLang] =
    useState<Locale>(() => {
      if (
        Languages.includes(result[1] as Locale)
      ) {
        return result[1] as Locale;
      }
      return "en";
    });

  useEffect(() => {
    let newPathname = result;
    newPathname[1] = selectedLang;
    let newUrl = newPathname.join("/");
    console.log(newUrl, "newUrl");
    router.push(newUrl);
    console.log(
      selectedLang,
      "selectedLang in navbar",
    );
  }, [selectedLang]);

  const dictionary = useDictionary();
  const intl = dictionary.Navbar;

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };

  const toggleLanguage = () => {
    if (selectedLang === "en") {
      setSelectedLang("ja");
    } else {
      setSelectedLang("en");
    }
  };

  const isActive = (path: string) => {
    let currentRoute: string;
    if (result.length > 2) {
      currentRoute = result[2];
    } else {
      currentRoute = "home";
    }
    return currentRoute === path;
  };

  return (
    <div className="h-24 flex justify-between items-center z-20">
      <Link
        href={`/${lang}`}
        className="font-bold text-2xl"
      >
        {intl.title}
      </Link>
      <div className="hidden md:flex items-center gap-5">
        <DarkModeToggle />
        <Link
          href={`/${lang}`}
          className={`${isActive("home") ? "font-bold text-[#53c28b]" : ""}`}
        >
          {intl.home}
        </Link>
        <Link
          href={`/${lang}/portfolio`}
          className={`${isActive("portfolio") ? "font-bold text-[#53c28b]" : ""}`}
        >
          {intl.portfolio}
        </Link>
        <Link
          href={`/${lang}/blog`}
          className={`${isActive("blog") ? "font-bold text-[#53c28b]" : ""}`}
        >
          {intl.blog}
        </Link>
        <Link
          href={`/${lang}/about`}
          className={`${isActive("about") ? "font-bold text-[#53c28b]" : ""}`}
        >
          {intl.about}
        </Link>
        <Link
          href={`/${lang}/contact`}
          className={`${isActive("contact") ? "font-bold text-[#53c28b]" : ""}`}
        >
          {intl.contact}
        </Link>
        <Link
          href={`/${lang}/dashboard`}
          className={`${isActive("dashboard") ? "font-bold text-[#53c28b]" : ""}`}
        >
          {intl.dashboard}
        </Link>
        <button
          className="px-2 py-1 border-none bg-[#53c28b] text-white cursor-pointer rounded"
          onClick={toggleLanguage}
        >
          {selectedLang === "en"
            ? "日本語"
            : "English"}
        </button>
        {isAuthenticated && (
          <button
            className="px-2 py-1 border-none bg-[#53c28b] text-white cursor-pointer rounded"
            onClick={() => clearUser()}
          >
            {intl.logout}
          </button>
        )}
      </div>
      <div className="md:hidden">
        <button
          className="px-2 py-1 border-none bg-[#53c28b] text-white cursor-pointer rounded"
          onClick={toggleMobileMenu}
        >
          {isMobileMenuOpen
            ? intl.close
            : intl.menu}
        </button>
      </div>
      {isMobileMenuOpen && (
        <div className="md:hidden flex-row absolute top-24 right-0 bg-white dark:bg-gray-800 py-2 px-4 shadow-lg rounded">
          <DarkModeToggle />
          <div className="flex flex-col gap-0.5">
            <Link
              href={`/${lang}/`}
              onClick={toggleMobileMenu}
              className={`${isActive("home") ? "font-bold text-[#53c28b]" : ""}`}
            >
              {intl.home}
            </Link>
            <Link
              href={`/${lang}/portfolio`}
              onClick={toggleMobileMenu}
              className={`${isActive("portfolio") ? "font-bold text-[#53c28b]" : ""}`}
            >
              {intl.portfolio}
            </Link>
            <Link
              href={`/${lang}/blog`}
              onClick={toggleMobileMenu}
              className={`${isActive("blog") ? "font-bold text-[#53c28b]" : ""}`}
            >
              {intl.blog}
            </Link>
            <Link
              href={`/${lang}/about`}
              onClick={toggleMobileMenu}
              className={`${isActive("about") ? "font-bold text-[#53c28b]" : ""}`}
            >
              {intl.about}
            </Link>
            <Link
              href={`/${lang}/contact`}
              onClick={toggleMobileMenu}
              className={`${isActive("contact") ? "font-bold text-[#53c28b]" : ""}`}
            >
              {intl.contact}
            </Link>
            <Link
              href={`/${lang}/dashboard`}
              onClick={toggleMobileMenu}
              className={`${isActive("dashboard") ? "font-bold text-[#53c28b]" : ""}`}
            >
              {intl.dashboard}
            </Link>
          </div>
          <button
            className="block w-full mb-1 md:mb-0 text-center py-2 border-none bg-[#53c28b] text-white cursor-pointer rounded"
            onClick={toggleLanguage}
          >
            {selectedLang === "en"
              ? "日本語"
              : "English"}
          </button>
          {isAuthenticated && (
            <button
              className="block w-full text-center py-2 border-none bg-[#53c28b] text-white cursor-pointer rounded"
              onClick={() => {
                clearUser();
                toggleMobileMenu();
              }}
            >
              {intl.logout}
            </button>
          )}
        </div>
      )}
    </div>
  );
}
