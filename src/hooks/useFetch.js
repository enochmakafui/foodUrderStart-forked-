import { useEffect, useState } from "react";

export function useFetch(fetchFn) {
  const [fetchedData, setFetchedData] = useState();
  const [isLoading, setIsLoading] = useState();
  useEffect(() => {
    async function fetchMeals() {
      setIsLoading(true);
      try {
        const data = await fetchFn();
        setFetchedData(data);
      } catch (error) {
        console.log(error);
      }
      setIsLoading(false);
    }

    fetchMeals();
  }, [fetchFn]);
  return {
    fetchedData,
    isLoading,
  };
}
