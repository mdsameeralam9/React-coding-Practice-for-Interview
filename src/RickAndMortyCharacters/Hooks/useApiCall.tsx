import { useCallback, useEffect, useState } from "react";

export interface ResponseInterface {
  id: number;
  image: string;
  name: string;
  status: string;
  species: string;
}

// cached response to avoid api call for same URL
const cachedData = new Map<string, ResponseInterface[]>();

const useApiCall = (url = "") => {
  const [data, setData] = useState<ResponseInterface[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);

  const fetchCharacters = useCallback(
    async (signal: AbortSignal) => {
      try {
        const cachedResponse = cachedData.get(url);
        if (cachedResponse) {
          setData(cachedResponse);
          setLoading(false);
          setError(false);
          return;
        }

        const response = await fetch(url, { signal });
        if (!response.ok) {
          throw new Error("Something went wrong!, Failed to retrieved data");
        }
        const { results = [] } = await response.json();
        if (Array.isArray(results) && results?.length > 0) {
          cachedData.set(url, results);
          setData(results);
        }
      } catch (error: unknown) {
        if (error instanceof DOMException) {
          if (error.name === "AbortError") {
            console.log("Abort error");
          }
        } else {
          setError(true);
        }
      } finally {
        setLoading(false);
      }
    },
    [url],
  );

  useEffect(() => {
    // use this to avoid calling api while unmounting the component
    // avoid race condition
    const abortController = new AbortController();

    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchCharacters(abortController.signal);

    return () => {
      abortController.abort();
    };
  }, [fetchCharacters]);

  return { data, loading, error };
};

export default useApiCall;
