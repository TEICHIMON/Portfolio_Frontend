import React from "react";
import Image from "next/image";
import { LocaleProps } from "@/app/[lang]/page";
import { getDictionary } from "@/app/[lang]/dictionaries";
// import "./footer.module.css";

export default async function Footer({
  params: { lang },
}: LocaleProps) {
  const dictionary = await getDictionary(lang);
  const intl = dictionary.Footer;
  return (
    <div className="py-4 px-6 text-sm flex flex-col md:flex-row items-center justify-between space-y-2 md:space-y-0">
      <div>{intl.text}</div>
      <div className="flex items-center space-x-2">
        {/*<Image*/}
        {/*  src="/1.png"*/}
        {/*  width={15}*/}
        {/*  height={15}*/}
        {/*  className="icon"*/}
        {/*  alt="Lama Dev Facebook Account"*/}
        {/*/>*/}
        {/*<Image*/}
        {/*  src="/2.png"*/}
        {/*  width={15}*/}
        {/*  height={15}*/}
        {/*  className="icon"*/}
        {/*  alt="Lama Dev"*/}
        {/*/>*/}
        {/*<Image*/}
        {/*  src="/3.png"*/}
        {/*  width={15}*/}
        {/*  height={15}*/}
        {/*  className="icon"*/}
        {/*  alt="Lama Dev"*/}
        {/*/>*/}
        {/*<Image*/}
        {/*  src="/4.png"*/}
        {/*  width={15}*/}
        {/*  height={15}*/}
        {/*  className="icon"*/}
        {/*  alt="Lama Dev"*/}
        {/*/>*/}
      </div>
    </div>
  );
}
