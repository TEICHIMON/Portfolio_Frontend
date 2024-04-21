import React from "react";
import Image from "next/image";
import Button from "@/components/Button/Button";
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

const About = async ({
  params: { lang },
}: LocaleProps) => {
  const dictionary = await getDictionary(lang);
  const intl = dictionary.About;

  return (
    <div className="mx-auto px-4">
      <div className="w-full h-72 relative">
        <Image
          src="https://images.pexels.com/photos/3194521/pexels-photo-3194521.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
          layout="fill"
          objectFit="cover"
          alt=""
          className="object-cover filter grayscale"
        />
        <div className="absolute bottom-5 left-5 bg-[#53c28b] p-1.5 text-white space-y-2">
          <h1 className="text-4xl font-bold">
            {intl.digitalStorytellers}
          </h1>
          <h2 className="text-xl font-medium">
            {intl.handcraftingExperiences}
          </h2>
        </div>
      </div>
      <div className="flex flex-col md:flex-row md:space-x-24 mt-12">
        <div className="md:flex-1 md:space-y-7">
          <h1 className="text-3xl font-semibold">
            {intl.whoAreWe}
          </h1>
          <p className="text-lg font-light text-justify">
            {intl.whoAreWeDescription}
          </p>
        </div>
        <div className="md:flex-1 md:space-y-7 mt-12 md:mt-0">
          <h1 className="text-3xl font-semibold">
            {intl.whatWeDo}
          </h1>
          <p className="text-lg font-light">
            {intl.whatWeDoDescription}
          </p>
          <Button
            url="/contact"
            text={intl.contactButton}
          />
        </div>
      </div>
    </div>
  );
};

export default About;
