import React from "react";
import Image from "next/image";
// import "./footer.module.css";

const Footer = () => {
  return (
    <div className="h-12 text-sm flex items-center justify-between">
      <div>
        ©2023 Sudami. All rights reserved.
      </div>
      <div className="flex items-center gap-2.5">
        <Image
          src="/1.png"
          width={15}
          height={15}
          className="icon"
          alt="Lama Dev Facebook Account"
        />
        <Image
          src="/2.png"
          width={15}
          height={15}
          className="icon"
          alt="Lama Dev"
        />
        <Image
          src="/3.png"
          width={15}
          height={15}
          className="icon"
          alt="Lama Dev"
        />
        <Image
          src="/4.png"
          width={15}
          height={15}
          className="icon"
          alt="Lama Dev"
        />
      </div>
    </div>
  );
};

export default Footer;
