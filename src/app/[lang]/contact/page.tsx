import React from "react";
import Image from "next/image";
import Button from "@/components/Button/Button";
import Link from "next/link";
import {
  Locale,
  getDictionary,
  PageType,
  Page,
} from "@/app/[lang]/dictionaries";

export type LocaleProps = {
  params: {
    lang: Locale;
  };
};

const Contact = async ({
  params: { lang },
}: LocaleProps) => {
  const dictionary = await getDictionary(lang);
  const intl = dictionary.Contact;

  return (
    <div className="mx-auto px-4 md:px-0 md:py-24 md:w-full">
      <h1 className="text-4xl md:text-6xl font-bold mb-10 md:mb-16 text-center">
        {intl.title}
      </h1>
      <div className="flex flex-col md:flex-row items-center justify-center gap-12 md:gap-12">
        <div className="w-full md:w-2/5 h-32 md:h-[500px] relative">
          <Image
            src="/contact.png"
            alt=""
            fill={true}
            className="object-contain animate-move"
          />
        </div>
        <div className="flex flex-col w-fit">
          <div className="px-4 md:px-5 py-3 md:py-4 bg-transparent border-solid border-2 md:border-3 border-gray-400 text-gray-400 rounded-2xl md:rounded-xl text-lg md:text-xl font-bold focus:outline-none mb-2 w-72">
            {intl.name}: ZHIWEN ZHENG
          </div>
          <div className="text- px-4 md:px-5 py-3 md:py-4 bg-transparent border-solid border-2 md:border-3 border-gray-400 text-gray-400 rounded-2xl md:rounded-xl text-lg md:text-xl font-bold focus:outline-none mb-2 w-fit">
            {intl.email}: sudami125@gmail.com
          </div>
          <div className="underline px-4 md:px-5 py-3 md:py-4 bg-transparent border-solid border-2 md:border-3 border-gray-400 text-gray-400 rounded-2xl md:rounded-xl text-lg md:text-xl font-bold focus:outline-none">
            <Link
              href="https://github.com/TEICHIMON"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-gray-300 overflow-auto break-all"
            >
              {intl.github}
              :https://github.com/TEICHIMON
            </Link>
            <br />
            <br />
            <Link
              href="https://www.linkedin.com/in/zhiwen-zheng-9967a1304"
              target="_blank"
              rel="noopener noreferrer"
              className="underline text-gray-400 hover:text-gray-300 break-all"
            >
              {intl.linkedin}
              :www.linkedin.com/in/zhiwen-zheng-9967a1304
            </Link>
            <br />
            <br />
            <Link
              href="https://learn.zzsj.me"
              target="_blank"
              rel="noopener noreferrer"
              className="underline text-gray-400 hover:text-gray-300 break-all"
            >
              {intl.portfolio}
              :https://learn.zzsj.me
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
