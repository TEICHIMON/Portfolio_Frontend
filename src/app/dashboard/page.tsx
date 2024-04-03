"use client";
import { useRouter } from "next/navigation";
import React, {
  FormEvent,
  useEffect,
  useLayoutEffect,
  useState,
} from "react";
import { useAuthStore } from "@/store/store";
import baseService from "@/https/base.service";
import styles from "./page.module.css";
import Image from "next/image";
import Notification from "@/components/Notification/Notification";

interface Post {
  _id: string;
  title: string;
  desc: string;
  img: string;
  content: string;
  username: string;
}

const Dashboard: React.FC = () => {
  const { isAuthenticated, user, clearUser } =
    useAuthStore();
  const [data, setData] = useState<Post[]>([]);
  const [isLoading, setIsLoading] =
    useState<boolean>(true);
  const [showNotification, setShowNotification] =
    useState(false);
  const router = useRouter();

  useLayoutEffect(() => {
    const fetchState = async () => {
      console.log(
        "trigger useEffect in dashboard",
      );
      let { isAuthenticated, user } =
        await useAuthStore.getState();
      if (!isAuthenticated) {
        setIsLoading(false);
        router.push("/dashboard/login");
      } else {
        setIsLoading(false);
      }
    };
    fetchState();
  }, [isAuthenticated, router]);

  if (user?.email === "t@qq.com") {
    user["role"] = "admin";
  }
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response =
          await baseService.get<Post[]>(`/posts`);
        setData(response);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
    console.log(user, "user");
    if (user) {
      fetchData();
    }
  }, [user]);

  const handleSubmit = async (
    e: FormEvent<HTMLFormElement>,
  ) => {
    e.preventDefault();
    const form = e.currentTarget;
    const title = (
      form.elements[0] as HTMLInputElement
    ).value;
    const desc = (
      form.elements[1] as HTMLInputElement
    ).value;
    const img = (
      form.elements[2] as HTMLInputElement
    ).value;
    const content = (
      form.elements[3] as HTMLTextAreaElement
    ).value;

    try {
      const result = await baseService.post<Post>(
        "/posts",
        {
          title,
          desc,
          img,
          content,
          username: user?.email,
        },
      );

      console.log(result, "result");

      const response =
        await baseService.get<Post[]>(`/posts`);
      setData(response);
      form.reset();
    } catch (err) {
      console.log(err);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      let result = await baseService.delete(
        `/posts/delete/${id}`,
      );
      console.log(result, "result in delete");
      const response =
        await baseService.get<Post[]>(`/posts`);
      setData(response);
    } catch (err) {
      console.log(err);
    }
  };

  if (isLoading) {
    console.log("loading");
    return null; // 或者显示加载状态
  } else if (!isLoading && isAuthenticated) {
    console.log("show content");
    return (
      <div className={styles.container}>
        {user?.role !== "admin" && (
          <Notification
            message="You are a visitor. You cannot edit or delete any content on this page."
            onClose={() =>
              setShowNotification(false)
            }
          />
        )}
        <div
          className={`${styles.posts} ${user?.role !== "admin" ? styles.disabled : ""}`}
        >
          {isLoading
            ? "loading"
            : data &&
              data.length > 0 &&
              data.map((post) => (
                <div
                  className={styles.post}
                  key={post._id}
                >
                  <div
                    className={
                      styles.imgContainer
                    }
                  >
                    {post.img && (
                      <Image
                        src={post.img}
                        alt=""
                        width={200}
                        height={100}
                      />
                    )}
                  </div>
                  <h2
                    className={styles.postTitle}
                  >
                    {post.title}
                  </h2>
                  {user?.role === "admin" && (
                    <span
                      className={styles.delete}
                      onClick={() =>
                        handleDelete(post._id)
                      }
                    >
                      X
                    </span>
                  )}
                </div>
              ))}
        </div>
        {user?.role === "admin" ? (
          <form
            className={styles.new}
            onSubmit={handleSubmit}
          >
            <h1>Add New Post</h1>
            <input
              type="text"
              placeholder="Title"
              className={styles.input}
            />
            <input
              type="text"
              placeholder="Desc"
              className={styles.input}
            />
            <input
              type="text"
              placeholder="Image"
              className={styles.input}
            />
            <textarea
              placeholder="Content"
              className={styles.textArea}
              cols={30}
              rows={10}
            ></textarea>
            <button className={styles.button}>
              Send
            </button>
          </form>
        ) : (
          <div
            className={`${styles.new} ${styles.disabled}`}
          >
            <h1>Add New Post</h1>
            <input
              type="text"
              placeholder="Title"
              className={styles.input}
              disabled
            />
            <input
              type="text"
              placeholder="Desc"
              className={styles.input}
              disabled
            />
            <input
              type="text"
              placeholder="Image"
              className={styles.input}
              disabled
            />
            <textarea
              placeholder="Content"
              className={styles.textArea}
              cols={30}
              rows={10}
              disabled
            ></textarea>
            <button
              className={`${styles.button} ${styles.disabled}`}
              disabled
            >
              Send
            </button>
          </div>
        )}
      </div>
    );
  }
};

export default Dashboard;
