import { useEffect, useMemo, useState } from "react";

// https://dummyjson.com/products/search?q=phone

function debounce(fn, delay = 500) {
  let timeOutId = null;

  return function (...args) {
    if (timeOutId) clearTimeout(timeOutId);

    timeOutId = setTimeout(() => {
      fn(...args);
    }, delay);
  };
}

const UserListWithDebounce = () => {
  const [productList, setProductList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [query, setQuery] = useState("");
  const [inputValue, setInputValue] = useState("");

  const fetchProducts = async () => {
    if (!query.trim()) {
      // setProductList([]);
     // return;
    }

    setLoading(true);
    setError(false);

    try {
      const res = await fetch(
        `https://dummyjson.com/products/search?q=${query}`,
      );

      if (!res.ok) {
        throw new Error("Failed to fetch products");
      }

      const data = await res.json();
      setProductList(data.products || []);
    } catch (err) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [query]);

  const debouncedSetQuery = useMemo(
    () =>
      debounce((value) => {
        setQuery(value);
      }, 500),
    [],
  );

  const handleChange = (e) => {
    setInputValue(e.target.value)
    debouncedSetQuery(e.target.value);
  };

  return (
    <div className="containerWr flex flex-col gap-4 justify-center items-center p-4">
      <input
        type="search"
        name="query"
        id="query"
        className="border w-[80%] p-1"
        placeholder="Search products..."
        value={inputValue}
        onChange={handleChange}
      />

      <div className="flex flex-wrap gap-2 justify-center items-center">
        {loading && <h1>Fetching Products...</h1>}

        {!loading && error && (
          <h1 className="text-red-500">
            Failed to fetch products. Something went wrong!
          </h1>
        )}

        {!loading &&
          !error &&
          productList.map((list) => (
            <div
              key={list.id}
              className="flex flex-col gap-1 justify-center items-center border h-50 w-40 p-2"
            >
              <img src={list.images?.[0]} alt={list.title} width="100" />

              <p>{list.title}</p>
              <p>$ {list.price}</p>
            </div>
          ))}
      </div>
    </div>
  );
};

export default UserListWithDebounce;
