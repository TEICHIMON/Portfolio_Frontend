"use client";
import React, {
  useCallback,
  useState,
} from "react";
import Link from "next/link";
import {
  usePathname,
  useRouter,
  useSearchParams,
} from "next/navigation";
import baseService from "../../../../../https/base.service";
import {
  Locale,
  getDictionary,
  PageType,
  Page,
} from "@/app/[lang]/dictionaries";
import { useDictionary } from "@/components/DictionaryProvider/DictionaryProvider";
import { useAuthStore } from "@/store/store";

export type LocaleProps = {
  params: {
    lang: Locale;
  };
};

const Register = () => {
  const [error, setError] = useState<
    string | null
  >(null);
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const dictionary = useDictionary();
  const { lang } = useAuthStore();
  const intl = dictionary.Register;

  // Get a new searchParams string by merging the current
  // searchParams with a provided key/value pair
  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(
        searchParams.toString(),
      );
      params.set(name, value);
      return params.toString();
    },
    [searchParams],
  );

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const name = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;

    try {
      const res = await baseService.post(
        "/register",
        {
          name,
          email,
          password,
        },
      );
      console.log(res, "res in register");

      if (res === "success") {
        router.push(
          `/${lang}/dashboard/login` +
            "?" +
            createQueryString(
              "success",
              intl.accountCreated,
            ),
        );
      } else if (res === "existed") {
        router.push(
          `/${lang}/dashboard/login` +
            "?" +
            createQueryString(
              "error",
              intl.accountUsed,
            ),
        );
      }
    } catch (err) {
      setError(err as null);
      console.log(err);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center gap-4 p-4">
      <h1 className="text-3xl text-gray-400">
        {intl.createAccount}
      </h1>
      <h2 className="text-xl mb-6 text-gray-400">
        {intl.signUpMessage}
      </h2>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 w-full max-w-sm"
      >
        <input
          type="text"
          placeholder={intl.username}
          required
          className="px-4 py-2 bg-transparent border-2 border-gray-400 rounded-md outline-none text-gray-400 text-lg font-bold"
        />
        <input
          type="text"
          placeholder={intl.email}
          required
          className="px-4 py-2 bg-transparent border-2 border-gray-400 rounded-md outline-none text-gray-400 text-lg font-bold"
        />
        <input
          type="text"
          placeholder={intl.password}
          required
          className="px-4 py-2 bg-transparent border-2 border-gray-400 rounded-md outline-none text-gray-400 text-lg font-bold"
        />
        <button className="px-4 py-2 bg-green-500 rounded-md text-gray-200 font-bold hover:bg-green-600">
          {intl.register}
        </button>
        {error && (
          <p className="text-red-500">
            {intl.errorMessage}
          </p>
        )}
      </form>
      <span className="text-gray-400">
        {intl.or}
      </span>
      <Link
        className="underline text-gray-500 hover:text-gray-700"
        href="/dashboard/login"
      >
        {intl.loginExistingAccount}
      </Link>
    </div>
  );
};

export default Register;
