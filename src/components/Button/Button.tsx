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
      <button className="h-fit p-2 md:p-3 md:mt-2 cursor-pointer bg-[#53c28b] hover:bg-green-500 border-none rounded-md max-w-max text-white">
        {text}
      </button>
    </Link>
  );
};

export default Button;
