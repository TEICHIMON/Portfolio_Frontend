import axios, {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  AxiosError,
} from "axios";
import base_config from "./config/base.config";
import requestInterceptors from "./interceptors/request.interceptors";

interface BaseService {
  get<T>(
    url: string,
    config?: AxiosRequestConfig,
  ): Promise<T>;
  post<T>(
    url: string,
    data: any,
    config?: AxiosRequestConfig,
  ): Promise<T>;
  put<T>(
    url: string,
    data: any,
    config?: AxiosRequestConfig,
  ): Promise<T>;
  delete<T>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig,
  ): Promise<T>;
  patch<T>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig,
  ): Promise<T>;
}

const instance: AxiosInstance =
  axios.create(base_config);

// 装载所有 request interceptor
requestInterceptors.forEach((item) => {
  instance.interceptors.request.use(...item);
});

// 加载所有 response interceptor
// responseInterceptors.forEach((item) => {
//   instance.interceptors.response.use(
//     item[0],
//     item[1],
//   );
// });

const handleError = (
  error: AxiosError,
): Promise<never> => {
  console.error(error);
  if (axios.isCancel(error)) {
    // 请求被取消的错误处理
    return Promise.reject(
      new Error("Request canceled"),
    );
  } else {
    // 其他错误处理
    return error;
  }
};

const baseService: BaseService = {
  get: <T>(
    url: string,
    config?: AxiosRequestConfig,
  ): Promise<T> => {
    return instance
      .get<T>(url, config)
      .then((response) => response.data)
      .catch(handleError);
  },

  post: <T>(
    url: string,
    data: any,
    config?: AxiosRequestConfig,
  ): Promise<T> => {
    return instance
      .post<T>(url, data, config)
      .then((response) => response.data)
      .catch(handleError);
  },

  put: <T>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig,
  ): Promise<T> => {
    return instance
      .put<T>(url, data, config)
      .then((response) => response.data)
      .catch(handleError);
  },

  delete: <T>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig,
  ): Promise<T> => {
    return instance
      .delete<T>(url, config)
      .then((response) => response.data)
      .catch(handleError);
  },

  patch: <T>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig,
  ): Promise<T> => {
    return instance
      .patch<T>(url, data, config)
      .then((response) => response.data)
      .catch(handleError);
  },
};

export default baseService;
