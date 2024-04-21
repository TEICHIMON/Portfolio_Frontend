// Portfolio.tsx
import React from "react";
import Link from "next/link";
import {
  Locale,
  getDictionary,
} from "@/app/[lang]/dictionaries";

type Props = {
  params: {
    lang: Locale;
  };
};

export default async function Portfolio({
  params: { lang },
}: Props) {
  const dictionary = await getDictionary(lang);
  const intl = dictionary.Portfolio;

  return (
    <div>
      <h1 className="text-5xl md:text-7xl font-bold mb-8">
        {intl.title}
      </h1>
      <h2 className="text-2xl md:text-3xl font-bold italic mb-3 ">
        {intl.chooseGallery}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <Link
          href={`/${lang}/portfolio/illustrations`}
          className="relative block border-4 border-gray-400 rounded-lg overflow-hidden h-48 md:h-96"
        >
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage:
                'url("/illustration.png")',
            }}
          ></div>
          <span className="absolute right-4 bottom-4 text-2xl md:text-4xl font-bold transition-colors duration-300 hover:text-green-500">
            {intl.illustrations}
          </span>
        </Link>
        <Link
          href={`/${lang}/portfolio/websites`}
          className="relative block border-4 border-gray-400 rounded-lg overflow-hidden  h-48 md:h-96"
        >
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage:
                'url("/websites.jpg")',
            }}
          ></div>
          <span className="absolute right-4 bottom-4 text-2xl md:text-4xl font-bold transition-colors duration-300 hover:text-green-500">
            {intl.websites}
          </span>
        </Link>
        <Link
          href={`/${lang}/portfolio/applications`}
          className="relative block border-4 border-gray-400 rounded-lg overflow-hidden  h-48 md:h-96"
        >
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: 'url("/apps.jpg")',
            }}
          ></div>
          <span className="absolute right-4 bottom-4 text-2xl md:text-4xl font-bold transition-colors duration-300 hover:text-green-500">
            {intl.applications}
          </span>
        </Link>
      </div>
    </div>
  );
}
