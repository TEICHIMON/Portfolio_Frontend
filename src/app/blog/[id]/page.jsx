import React from "react";
import styles from "./page.module.css";
import Image from "next/image";
import { notFound } from "next/navigation";
import baseConfig from "../../../https/config/base.config";

async function getData(id) {
  let res = await fetch(
    `${baseConfig.baseURL}/posts/${id}`,
    {
      cache: "no-store",
    },
  );
  res = await res.json();

  if (!res.title) {
    return notFound();
  }

  return res;
}

export async function generateMetadata({
  params,
}) {
  const post = await getData(params.id);
  return {
    title: post.title,
    description: post.desc,
  };
}

const BlogPost = async ({ params }) => {
  const data = await getData(params.id);
  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <div className={styles.info}>
          <h1 className={styles.title}>
            {data.title}
          </h1>
          <p className={styles.desc}>
            {data.desc}
          </p>
          <div className={styles.author}>
            {data.img && (
              <Image
                src={data.img}
                alt=""
                width={40}
                height={40}
                className={styles.avatar}
              />
            )}
            <span className={styles.username}>
              {data.username}
            </span>
          </div>
        </div>
        <div className={styles.imageContainer}>
          {data.img && (
            <Image
              src={data.img}
              alt=""
              fill={true}
              className={styles.image}
            />
          )}
        </div>
      </div>
      <div className={styles.content}>
        <p className={styles.text}>
          {data.content}
        </p>
      </div>
    </div>
  );
};

export default BlogPost;
