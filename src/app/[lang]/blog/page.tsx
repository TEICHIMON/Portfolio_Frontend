import React from "react";
import Link from "next/link";
import Image from "next/image";
import baseConfig from "@/https/config/base.config";

interface Post {
  _id: string;
  id: string;
  title: string;
  desc: string;
  img: string;
}

async function getData(): Promise<Post[]> {
  try {
    const response = await fetch(
      `${baseConfig.baseURL}/posts`,
      {
        cache: "no-store",
      },
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
}

const Blog = async () => {
  const data = await getData();
  return (
    <div className="space-y-8">
      {data && data.length > 0 ? (
        data.map((item) => (
          <Link
            href={`/blog/${item._id}`}
            key={item._id}
            className="flex items-center gap-8 mb-8 pb-8 border-b-2 w-auto"
          >
            <div className="w-48">
              {item.img && (
                <Image
                  src={item.img}
                  alt=""
                  width={400}
                  height={250}
                  className="w-auto h-24 object-cover"
                />
              )}
            </div>
            <div>
              <h1 className="mb-2 text-xl font-bold">
                {item.title}
              </h1>
              <p className="text-lg text-gray-500">
                {item.desc}
              </p>
            </div>
          </Link>
        ))
      ) : (
        <p>No blog posts found.</p>
      )}
    </div>
  );
};

export default Blog;
