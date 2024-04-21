"use client";

import {
  AuthState,
  useAuthStore,
} from "@/store/store";
import { useEffect } from "react";
import baseService from "@/https/base.service";
import { Locale } from "@/app/[lang]/dictionaries";

export default function AppInitializer({
  children,
  lang,
}: {
  children: React.ReactNode;
  lang: Locale;
}) {
  const { setIsAuthenticated, setLang } =
    useAuthStore();

  useEffect(() => {
    if (lang) {
      setLang(lang);
    }
    baseService
      .get("profile", {
        url: "profile",
      })
      .then((res) => {
        if (res === "success") {
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
        }
      });
  }, []);

  return children;
}
