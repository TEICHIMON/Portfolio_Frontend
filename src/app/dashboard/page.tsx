"use client";
import { useRouter } from "next/navigation";
import Image from "next/image";
import React, { useEffect } from "react";
import { useAuthStore } from "@/store/store";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import baseService from "@/https/base.service";

const Dashboard: React.FC = () => {
  const { user, isAuthenticated, clearUser } =
    useAuthStore();

  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/dashboard/login");
    }
  }, [isAuthenticated, router]);

  return (
    <div className="container">
      {"I am Dashboard"}
    </div>
  );
};

export default Dashboard;
