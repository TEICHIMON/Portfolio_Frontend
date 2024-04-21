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
import Image from "next/image";
import Notification from "@/components/Notification/Notification";
import {
  Locale,
  getDictionary,
  PageType,
  Page,
} from "@/app/[lang]/dictionaries";
import { useDictionary } from "@/components/DictionaryProvider/DictionaryProvider";

interface Post {
  _id: string;
  title: string;
  desc: string;
  img: string;
  content: string;
  username: string;
}

export type LocaleProps = {
  params: {
    lang: Locale;
  };
};

const Dashboard: React.FC<LocaleProps> = () => {
  const {
    isAuthenticated,
    user,
    lang,
    clearUser,
  } = useAuthStore();
  const [data, setData] = useState<Post[]>([]);
  const [isLoading, setIsLoading] =
    useState<boolean>(true);
  const [showNotification, setShowNotification] =
    useState(false);
  const router = useRouter();
  const dictionary = useDictionary();
  const intl = dictionary.Dashboard;

  useLayoutEffect(() => {
    const fetchState = async () => {
      let { isAuthenticated, user } =
        await useAuthStore.getState();
      if (!isAuthenticated) {
        setIsLoading(false);
        router.push(`/${lang}/dashboard/login`);
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
      const response =
        await baseService.get<Post[]>(`/posts`);
      setData(response);
    } catch (err) {
      console.log(err);
    }
  };

  if (isLoading) {
    return null;
  } else if (!isLoading && isAuthenticated) {
    return (
      <div className="flex flex-col md:flex-row gap-8 p-4">
        {user?.role !== "admin" && (
          <Notification
            message={intl.visitorMessage}
            onClose={() =>
              setShowNotification(false)
            }
          />
        )}
        <div
          className={`flex-1 ${user?.role !== "admin" ? "opacity-50 pointer-events-none" : ""}`}
        >
          {isLoading
            ? intl.loading
            : data &&
              data.length > 0 &&
              data.map((post) => (
                <div
                  key={post._id}
                  className="flex items-center justify-between my-8 border-b-2 pb-1"
                >
                  <div className="w-36 h-auto mr-4">
                    {post.img && (
                      <Image
                        src={post.img}
                        alt=""
                        width={200}
                        height={100}
                      />
                    )}
                  </div>
                  <h2 className="text-lg md:text-xl font-bold">
                    {post.title}
                  </h2>
                  {user?.role === "admin" && (
                    <span
                      className="text-red-500 cursor-pointer font-bold text-xl border-4 border-red-600 border-solid"
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
            className="flex-1 flex flex-col gap-4"
            onSubmit={handleSubmit}
          >
            <h1 className="text-2xl">
              {intl.addNewPost}
            </h1>
            <input
              type="text"
              placeholder={intl.title}
              className="px-2 py-1 bg-transparent border-2 border-gray-400 rounded text-gray-400 text-lg font-bold"
            />
            <input
              type="text"
              placeholder={intl.description}
              className="px-2 py-1 bg-transparent border-2 border-gray-400 rounded text-gray-400 text-lg font-bold"
            />
            <input
              type="text"
              placeholder={intl.image}
              className="px-2 py-1 bg-transparent border-2 border-gray-400 rounded text-gray-400 text-lg font-bold"
            />
            <textarea
              placeholder={intl.content}
              className="px-2 py-1 bg-transparent border-2 border-gray-400 rounded text-gray-400 text-lg font-bold"
              cols={30}
              rows={10}
            ></textarea>
            <button className="px-4 py-2 bg-green-500 rounded text-gray-200 font-bold hover:bg-green-600">
              {intl.send}
            </button>
          </form>
        ) : (
          <div className="flex-1 flex flex-col gap-4 opacity-50 pointer-events-none">
            <h1 className="text-2xl">
              {intl.addNewPost}
            </h1>
            <input
              type="text"
              placeholder={intl.title}
              className="px-2 py-1 bg-gray-200 border-2 border-gray-300 rounded text-gray-500 text-lg font-bold"
              disabled
            />
            <input
              type="text"
              placeholder={intl.description}
              className="px-2 py-1 bg-gray-200 border-2 border-gray-300 rounded text-gray-500 text-lg font-bold"
              disabled
            />
            <input
              type="text"
              placeholder={intl.image}
              className="px-2 py-1 bg-gray-200 border-2 border-gray-300 rounded text-gray-500 text-lg font-bold"
              disabled
            />
            <textarea
              placeholder={intl.content}
              className="px-2 py-1 bg-gray-200 border-2 border-gray-300 rounded text-gray-500 text-lg font-bold"
              cols={30}
              rows={10}
              disabled
            ></textarea>
            <button
              className="px-4 py-2 bg-gray-300 rounded text-gray-500 font-bold cursor-not-allowed"
              disabled
            >
              {intl.send}
            </button>
          </div>
        )}
      </div>
    );
  }
};

export default Dashboard;
