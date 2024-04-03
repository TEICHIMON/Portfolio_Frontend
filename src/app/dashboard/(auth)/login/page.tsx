"use client";
import React, {
  FormEvent,
  useEffect,
  useLayoutEffect,
  useState,
} from "react";
import styles from "./page.module.css";
import {
  useRouter,
  useSearchParams,
} from "next/navigation";
import Link from "next/link";
import { useAuthStore } from "@/store/store";
import baseService from "../../../../https/base.service";
import Cookies from "js-cookie";

type resType = {
  access_token: string;
  email: string;
  status: "success" | "failure";
};
const Login = () => {
  const { setUser, isAuthenticated } =
    useAuthStore();
  const router = useRouter();

  const [isLoading, setIsLoading] =
    useState(false);
  const params = useSearchParams();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useLayoutEffect(() => {
    setError(params.get("error") || "");
    setSuccess(params.get("success") || "");
    if (isAuthenticated) {
      router.push("/dashboard");
    }
  }, [params]);

  if (isLoading) {
    return <p>Loading...</p>;
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
        setUser({ email: res.email });
        Cookies.set("token", res.access_token);
        router.push("/dashboard");
      });
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>
        {success ? success : "Welcome Back"}
      </h1>
      <h2 className={styles.subtitle}>
        Please sign in to see the dashboard.
      </h2>

      <form
        onSubmit={handleSubmit}
        className={styles.form}
      >
        <input
          type="text"
          placeholder="Email"
          required
          className={styles.input}
        />
        <input
          type="password"
          placeholder="Password"
          required
          className={styles.input}
        />
        <button className={styles.button}>
          Login
        </button>
        {error && error}
      </form>
      {/*<button*/}
      {/*  onClick={() => {*/}
      {/*    signIn("google");*/}
      {/*  }}*/}
      {/*  className={*/}
      {/*    styles.button + " " + styles.google*/}
      {/*  }*/}
      {/*>*/}
      {/*  Login with Google*/}
      {/*</button>*/}
      <span className={styles.or}>- OR -</span>
      <Link
        className={styles.link}
        href="/dashboard/register"
      >
        Create new account
      </Link>
      {/* <button
        onClick={() => {
          signIn("github");
        }}
        className={styles.button + " " + styles.github}
      >
        Login with Github
      </button> */}
    </div>
  );
};

export default Login;
