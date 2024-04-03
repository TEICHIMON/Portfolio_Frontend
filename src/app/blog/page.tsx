import React from "react";
import styles from "./page.module.css";
import Link from "next/link";
import Image from "next/image";
import baseService from "@/https/base.service";

interface Post {
  _id: string;
  id: string;
  title: string;
  desc: string;
  img: string;
}

async function getData(): Promise<Post[]> {
  try {
    const response =
      await baseService.get<Post[]>("/posts");
    return response;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw new Error("Failed to fetch data");
  }
}

const Blog = async () => {
  const data = await getData();
  console.log(data, "data in blog");

  return (
    <div className={styles.mainContainer}>
      {data
        ? data.map((item) => (
            <Link
              href={`/blog/${item._id}`}
              className={styles.container}
              key={item.id}
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
