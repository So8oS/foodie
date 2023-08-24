import useSwr from "swr";

import fetcher from "./fetcher";

const GetResturant = () => {
  const { data, error, isLoading, mutate } = useSwr("/api/getResturant", fetcher);
  return {
    data,
    error,
    isLoading,
    mutate,
  };
};

export default GetResturant;
