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
import {
  getDictionary,
  Locale,
} from "@/app/[lang]/dictionaries";
import DictionaryProvider from "@/components/DictionaryProvider/DictionaryProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Sudami Portfolio",
  description: "",
};

export default async function HomeLayout({
  children,
  params: { lang },
}: {
  children: React.ReactNode;
  params: {
    lang: Locale;
  };
}) {
  const dictionary = await getDictionary(lang);

  return (
    <html lang={lang}>
      <body className={inter.className}>
        <ThemeProvider>
          <AuthProvider>
            <AppInitializer lang={lang}>
              <DictionaryProvider
                dictionary={dictionary}
              >
                <div className="container">
                  <Navbar />

                  {children}
                  <Footer params={{ lang }} />
                </div>
              </DictionaryProvider>
            </AppInitializer>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
