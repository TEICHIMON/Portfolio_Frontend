import React from "react";
import { getData } from "../serverActions/blogServerActions";
import styles from "./page.module.css";
import Link from "next/link";
import Image from "next/image";

const Blog = async () => {
  // const data = getData();
  // return <div>test: {JSON.stringify(data)}</div>;
  return <div>Blog</div>;
};

export default Blog;
