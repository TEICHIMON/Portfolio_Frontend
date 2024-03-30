"use client";

import {
  AuthState,
  useAuthStore,
} from "@/store/store";
import useStoreHook from "@/hooks/useStoreHook";
import { useEffect } from "react";
import baseService from "@/https/base.service";

export default function AppInitializer({
  children,
}: {
  children: React.ReactNode;
}) {
  const { setIsAuthenticated } = useAuthStore();

  useEffect(() => {
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

    // if (result) {
    //   const { setIsAuthenticated, clearUser } =
    //     result;
    //   if (typeof window !== "undefined") {
    //     setIsAuthenticated(true);
    //   } else {
    //     setIsAuthenticated(false);
    //   }
    // }
  }, []);

  return children;
}
