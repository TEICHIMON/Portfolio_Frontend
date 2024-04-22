import Image from "next/image";
import Hero from "../../../public/hero.png";
import React from "react";
import Button from "@/components/Button/Button";
import {
  Locale,
  getDictionary,
} from "./dictionaries";
import { notFound } from "next/navigation";
export type LocaleProps = {
  params: {
    lang: Locale;
  };
};

const paramsArray = ["en", "ja"];
export async function generateStaticParams() {
  return [{ lang: "en" }, { lang: "ja" }];
}

export default async function Home({
  params: { lang },
}: LocaleProps) {
  if (!paramsArray.includes(lang)) {
    notFound();
  }
  const dictionary = await getDictionary(lang);
  const intl = dictionary.Home;

  return (
    <div className="flex flex-col md:flex-row items-center md:space-x-24 space-y-12 md:space-y-0">
      <div className="flex-1 w-full flex flex-col space-y-12">
        <h1
          className="text-4xl md:text-7xl font-bold leading-tight"
          style={{
            background:
              "linear-gradient(to bottom, #194c33, #bbb)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          {intl.hello}
        </h1>
        <p className="text-lg md:text-xl font-light">
          {intl.description}
        </p>
        <Button
          url={`/${lang}/portfolio`}
          text={intl.button_text}
        />
      </div>
      <div className="flex-1 flex justify-center">
        <Image
          src={Hero}
          alt=""
          className="w-full md:w-auto h-auto object-contain"
        />
      </div>
    </div>
  );
}
