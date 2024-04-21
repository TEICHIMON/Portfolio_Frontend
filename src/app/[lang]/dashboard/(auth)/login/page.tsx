"use client";
import React, {
  FormEvent,
  Suspense,
  useEffect,
  useLayoutEffect,
  useState,
} from "react";
import {
  useRouter,
  useSearchParams,
} from "next/navigation";
import Link from "next/link";
import { useAuthStore } from "@/store/store";
import baseService from "../../../../../https/base.service";
import Cookies from "js-cookie";
import {
  Locale,
  getDictionary,
  PageType,
  Page,
} from "@/app/[lang]/dictionaries";
import { useDictionary } from "@/components/DictionaryProvider/DictionaryProvider";

type resType = {
  access_token: string;
  email: string;
  status: "success" | "failure";
  response: {
    data: { message: string };
  };
};

export type LocaleProps = {
  params: {
    lang: Locale;
  };
};

const LoginInner = () => {
  const { setUser, isAuthenticated, lang } =
    useAuthStore();
  const router = useRouter();
  const dictionary = useDictionary();
  const intl = dictionary.Login;

  const [isLoading, setIsLoading] =
    useState(false);
  const params = useSearchParams();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useLayoutEffect(() => {
    setError(params.get("error") || "");
    setSuccess(params.get("success") || "");
    if (isAuthenticated) {
      router.push(`/${lang}/dashboard`);
    }
  }, [params]);

  if (isLoading) {
    return <p>{intl.loading}</p>;
  }

  const handleSubmit = (
    e: FormEvent<HTMLFormElement>,
  ) => {
    e.preventDefault();
    const email = (
      e.currentTarget
        .elements[0] as HTMLInputElement
    ).value;
    const password = (
      e.currentTarget
        .elements[1] as HTMLInputElement
    ).value;
    setIsLoading(true);
    baseService
      .post<resType>("/login", {
        email,
        password,
      })
      .then((res) => {
        setIsLoading(false);
        if (res.email) {
          setUser({ email: res.email });
          Cookies.set("token", res.access_token);
          router.push(`/${lang}/dashboard`);
        } else {
          setError(res.response.data.message);
        }
      });
  };

  return (
    <div className="flex flex-col items-center gap-4 p-4">
      <h1 className="text-3xl font-bold md:text-4xl text-gray-300">
        {success ? success : intl.welcomeBack}
      </h1>
      <h2 className="text-xl mb-6 text-gray-400">
        {intl.signInMessage}
      </h2>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 w-full max-w-sm"
      >
        <input
          type="text"
          placeholder={intl.email}
          required
          className="px-4 py-2 bg-transparent border-2 border-gray-400 rounded-md outline-none text-gray-400 text-lg font-bold"
        />
        <input
          type="password"
          placeholder={intl.password}
          required
          className="px-4 py-2 bg-transparent border-2 border-gray-400 rounded-md outline-none text-gray-400 text-lg font-bold"
        />
        <button className="px-4 py-2 bg-green-500 rounded-md text-gray-200 font-bold hover:bg-green-600">
          {intl.login}
        </button>
        {error && (
          <p className="text-red-500">{error}</p>
        )}
      </form>

      <span className="text-gray-400">
        {intl.or}
      </span>
      <Link
        className="underline text-gray-300 hover:text-gray-700"
        href="/dashboard/register"
      >
        {intl.createNewAccount}
      </Link>
    </div>
  );
};

const Login = () => {
  return (
    <Suspense>
      <LoginInner />
    </Suspense>
  );
};

export default Login;
