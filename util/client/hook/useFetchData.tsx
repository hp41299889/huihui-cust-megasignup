import useSWR, { KeyedMutator } from "swr";
import { AxiosResponse } from "axios";

import { Response } from "@/util/server/api";

type FetchData<T> = (query?: object) => Promise<AxiosResponse<Response<T>>>;

interface UseFetchDataConfig {
  query?: object;
  refreshInterval?: number;
}

export const useFetchData = <T,>(
  key: string,
  fetchData: FetchData<T>,
  config?: UseFetchDataConfig
): [T | undefined, KeyedMutator<T>, boolean, any] => {
  const fetcher = async (query?: object) => {
    return (await fetchData(query)).data.resbonse.data;
  };

  const { data, mutate, isLoading, error } = useSWR<T>(key, fetcher, {
    refreshInterval: 5000,
  });

  return [data, mutate, isLoading, error];
};
