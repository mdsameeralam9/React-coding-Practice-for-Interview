import React, { useEffect, useState, useDeferredValue } from "react";

const SearchWithAPI = () => {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [data, setData] = useState([]);

  // const debouncedValue = useDebounce(query, 500);
  const debouncedValue = useDeferredValue(query);

  useEffect(() => {
    if (debouncedValue.length <= 2) {
      setData([]);
      return;
    }

    const controller = new AbortController();

    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError(false);

        const res = await fetch(
          `https://dummyjson.com/products/search?q=${encodeURIComponent(
            debouncedValue,
          )}`,
          {
            signal: controller.signal,
          },
        );

        if (!res.ok) {
          throw new Error("Failed to fetch");
        }

        const json = await res.json();

        setData(json.products || []);
      } catch (err) {
        if (err.name !== "AbortError") {
          setError(true);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();

    return () => controller.abort();
  }, [debouncedValue]);

  return (
    <div>
      <input
        className="border px-2 py-1"
        type="search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search products..."
      />

      {loading && <h2>Loading...</h2>}

      {error && <h2>Something went wrong.</h2>}

      {!loading && !error && data.length === 0 && debouncedValue.length > 2 && (
        <h2>No products found.</h2>
      )}

      <div className="flex flex-wrap gap-2 mt-4">
        {data.map(({ id, title, price, images, thumbnail }) => (
          <div key={id} className="border w-28 p-2 flex flex-col items-center">
            <img src={images?.[0] || thumbnail} alt={title} loading="lazy" />
            <p>{title}</p>
            <p>${price}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchWithAPI;

function useDebounce(value, delay = 500) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => clearTimeout(timer);
  }, [value, delay]);

  return debouncedValue;
}
