import React from "react";
import Link from "next/link";

const Portfolio = () => {
  return (
    <div className="flex flex-col items-center space-y-8">
      <h1 className="text-9xl">Choose a gallery</h1>
      <div className="flex space-x-12">
        <Link
          href="/portfolio/illustrations"
          className="border-4 border-gray-400 rounded p-4 w-72 h-96 relative bg-cover"
          style={{ backgroundImage: "url('/illustration.png')" }}
        >
          <span className="absolute bottom-2 right-2 text-4xl font-bold">
            Illustrations
          </span>
        </Link>
        <Link
          href="/portfolio/websites"
          className="border-4 border-gray-400 rounded p-4 w-72 h-96 relative bg-cover"
          style={{ backgroundImage: "url('/websites.jpg')" }}
        >
          <span className="absolute bottom-2 right-2 text-4xl font-bold">
            Websites
          </span>
        </Link>
        <Link
          href="/portfolio/application"
          className="border-4 border-gray-400 rounded p-4 w-72 h-96 relative bg-cover"
          style={{ backgroundImage: "url('/apps.jpg')" }}
        >
          <span className="absolute bottom-2 right-2 text-4xl font-bold">
            Application
          </span>
        </Link>
      </div>
    </div>
  );
};

export default Portfolio;
