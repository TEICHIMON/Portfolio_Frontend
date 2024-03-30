import type {
  AxiosError,
  InternalAxiosRequestConfig,
} from "axios";
import Cookies from "js-cookie";

type requestHandlerType = [
  (
    config: InternalAxiosRequestConfig,
  ) => InternalAxiosRequestConfig,
  (error: AxiosError) => Promise<AxiosError>,
];
const addToken: requestHandlerType = [
  (config) => {
    if (config.url === "profile") {
      const token = Cookies.get("token");
      config.headers = config.headers || {};
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }

    return config;
  },
  (error) => {
    {
      return Promise.reject(error);
    }
  },
];

export default [addToken];
