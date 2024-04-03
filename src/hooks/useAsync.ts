"use client";
import {
  useState,
  useEffect,
  useCallback,
} from "react";

interface AsyncDataState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

const useAsyncData = <T>(
  fetchData: () => Promise<T>,
) => {
  const [state, setState] = useState<
    AsyncDataState<T>
  >({
    data: null,
    loading: true,
    error: null,
  });

  const memoizedFetchData = useCallback(() => {
    fetchData()
      .then((data) => {
        setState({
          data,
          loading: false,
          error: null,
        });
      })
      .catch((error) => {
        console.error(
          "Error fetching data:",
          error,
        );
        setState({
          data: null,
          loading: false,
          error: "Failed to fetch data",
        });
      });
  }, [fetchData]);

  useEffect(() => {
    memoizedFetchData();
  }, [memoizedFetchData]);

  return state;
};

export default useAsyncData;
