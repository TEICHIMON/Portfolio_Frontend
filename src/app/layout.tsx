import "./globals.css";
import { Inter } from "next/font/google";
import React from "react";
import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/footer/Footer";
import { ThemeProvider } from "@/context/ThemeContext";
import AuthProvider from "@/components/AuthProvider/AuthProvider";
import { useQuery } from "@tanstack/react-query";
import baseService from "@/https/base.service";
import AppInitializer from "@/components/AppInitializer/AppInitializer";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Sudami Portfolio",
  description: "",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider>
          <AuthProvider>
            <AppInitializer>
              <div className="container">
                <Navbar />
                {children}
                <Footer />
              </div>
            </AppInitializer>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
