import React from "react";
import Image from "next/image";
// import "./footer.module.css";

const Footer = () => {
  return (
    <div className="py-4 px-6 text-sm flex flex-col md:flex-row items-center justify-between space-y-2 md:space-y-0">
      <div>
        ©2024 Sudami. All rights reserved.
      </div>
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
};

export default Footer;
