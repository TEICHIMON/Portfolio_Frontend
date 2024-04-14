import Image from "next/image";
import Hero from "../../public/hero.png";

import React from "react";
import Button from "@/components/Button/Button";

export default function Home() {
  return (
    <div className="flex flex-col md:flex-row items-center md:space-x-24 space-y-12 md:space-y-0">
      <div className="flex-1 flex flex-col space-y-12">
        <h1
          className="text-4xl md:text-7xl font-bold leading-tight"
          style={{
            background:
              "linear-gradient(to bottom, #194c33, #bbb)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          Better design for your digital products.
        </h1>
        <p className="text-lg md:text-xl font-light">
          Turning your Idea into Reality. We bring
          together the teams from the global tech
          industry.
        </p>
        <Button
          url="/portfolio"
          text="See Our Works"
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

// 使用getServerSideProps获取数据
