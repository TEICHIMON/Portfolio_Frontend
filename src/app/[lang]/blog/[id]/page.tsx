import React from "react";
import Image from "next/image";
import { notFound } from "next/navigation";
import baseConfig from "../../../../https/config/base.config";

interface postResponseT extends Response {
  title: string;
  desc: string;
  content: string;
  username: string;
  img: string;
}

async function getData(id: string) {
  let resData = await fetch(
    `${baseConfig.baseURL}/posts/${id}`,
  );
  let res: postResponseT = await resData.json();

  if (!res.title) {
    return notFound();
  }

  return res;
}

export async function generateMetadata({
  params,
}: {
  params: { id: string };
}) {
  const post = await getData(params.id);
  return {
    title: post.title,
    description: post.desc,
  };
}

const BlogPost = async ({
  params,
}: {
  params: { id: string };
}) => {
  const data = await getData(params.id);
  return (
    <div className="mx-auto px-4 w-full">
      <div className="flex flex-col md:flex-row">
        <div className="md:w-1/2 mb-8 md:mb-0">
          <h1 className="text-4xl font-bold mb-4">
            {data.title}
          </h1>
          <p className="text-lg  mb-8">
            {data.desc}
          </p>
          <div className="flex items-center gap-4">
            {data.img && (
              <Image
                src={data.img}
                alt=""
                width={40}
                height={40}
                className="rounded-full"
              />
            )}
            <span className="">
              {data.username}
            </span>
          </div>
        </div>
        <div className="md:w-1/2 relative h-64 md:h-auto">
          {data.img && (
            <Image
              src={data.img}
              alt=""
              fill
              className="object-contain"
            />
          )}
        </div>
      </div>
      <div className="mt-12">
        <div className="text-lg  text-left break-normal whitespace-pre-line">
          {data.content}
        </div>
      </div>
    </div>
  );
};

export default BlogPost;
