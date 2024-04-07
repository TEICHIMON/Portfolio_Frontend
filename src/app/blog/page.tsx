import React from "react";
import styles from "./page.module.css";
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
    throw new Error("Failed to fetch data");
  }
}

const Blog = async () => {
  const data = await getData();

  return (
    <div className={styles.mainContainer}>
      {data && data.length > 0
        ? data.map((item) => (
            <Link
              href={`/blog/${item._id}`}
              className={styles.container}
              key={item._id}
            >
              <div
                className={styles.imageContainer}
              >
                {item.img && (
                  <Image
                    src={item.img}
                    alt=""
                    width={400}
                    height={250}
                    className={styles.image}
                  />
                )}
              </div>
              <div className={styles.content}>
                <h1 className={styles.title}>
                  {item.title}
                </h1>
                <p className={styles.desc}>
                  {item.desc}
                </p>
              </div>
            </Link>
          ))
        : "blog"}
    </div>
  );
};

export default Blog;
