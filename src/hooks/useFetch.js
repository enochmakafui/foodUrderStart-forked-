import { useEffect, useState } from "react";

export function useFetch(fetchFn) {
  const [fetchedData, setFetchedData] = useState();
  const [isLoading, setIsLoading] = useState();
  const [error, setError] = useState();
  useEffect(() => {
    async function fetchMeals() {
      setIsLoading(true);
      try {
        const data = await fetchFn();
        setFetchedData(data);
      } catch (error) {
        setError({ message: error.message || "Could not fetch meal data" });
      }
      setIsLoading(false);
    }

    fetchMeals();
  }, [fetchFn]);
  return {
    fetchedData,
    isLoading,
    error,
    setError,
  };
}
