// Category.tsx
import React from "react";
import Button from "@/components/Button/Button";
import Image from "next/image";
import { notFound } from "next/navigation";
import {
  getDictionary,
  Locale,
  Page,
} from "@/app/[lang]/dictionaries";
import { LocaleProps } from "@/app/[lang]/page";
type DataT =
  | "applications"
  | "websites"
  | "illustrations";

export default async function Category({
  params: { lang, category },
}: {
  params: { lang: Locale; category: DataT };
}) {
  const categoryMap = {
    applications: "Skills",
    websites: "Project Experience",
    illustrations: "Work Experience",
  };
  const dictionary = await getDictionary(lang);
  const intl = dictionary[category as DataT];
  return (
    <div className="container mx-auto px-4 md:px-0">
      <h1 className="text-4xl md:text-5xl font-bold text-green-500 mb-8">
        {categoryMap[category]}
      </h1>

      {intl.map((item) => (
        <div
          key={item.id}
          className="flex flex-col md:flex-row items-center gap-8 md:gap-16 mb-24"
        >
          <div className="w-full  order-2 md:order-1">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              {item.title}
            </h2>
            <p className="text-lg md:text-xl mb-6 whitespace-pre-line">
              {item.desc}
            </p>
            {/*<Button text="See More" url="#" />*/}
          </div>
          {item.image && (
            <div className="w-full h-64 md:h-96 relative order-1 md:order-2">
              <Image
                src={item.image}
                alt=""
                fill
                className="object-cover rounded-lg"
              />
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
