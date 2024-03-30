"use server";
import connect from "@/utils/db";
import Post from "@/models/Post";

interface IPostData {
  title: string;
  desc: string;
  img: string;
  content: string;
  username: string;
}
export async function getData(username: string) {
  try {
    await connect();
    const posts = await Post.find(
      username ? { username } : {},
    );

    return posts;
  } catch (error) {
    throw new Error("Connection failed!");
  }
}

export async function postData(
  postDataObj: IPostData,
) {
  try {
    await connect();
    const post = new Post(postDataObj);
    let result = await post.save();
    return post;
  } catch (error) {
    throw new Error("Connection failed!");
  }
}
