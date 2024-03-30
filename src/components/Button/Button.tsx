import React from "react";
import Link from "next/link";

const Button = ({
  text,
  url,
}: {
  text: string;
  url: string;
}) => {
  return (
    <Link href={url}>
      <button className="p-5 cursor-pointer bg-[#53c28b] border-none rounded-md max-w-max text-white">
        {text}
      </button>
    </Link>
  );
};

export default Button;
