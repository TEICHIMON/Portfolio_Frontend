"use client";

import {
  AuthState,
  useAuthStore,
} from "@/store/store";
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
        console.log("appinitail");

        if (res === "success") {
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
        }
      });
  }, []);

  return children;
}
