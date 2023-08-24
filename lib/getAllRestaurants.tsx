import useSwr from "swr";

import fetcher from "./fetcher";

const GetAllRestaurants = () => {
  const { data, error, isLoading, mutate } = useSwr("/api/getAllRestaurants", fetcher);
  return {
    data,
    error,
    isLoading,
    mutate,
  };
};

export default GetAllRestaurants;
