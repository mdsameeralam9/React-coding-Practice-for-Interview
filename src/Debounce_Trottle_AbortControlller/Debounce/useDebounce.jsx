import React, { useEffect, useState } from "react";

const useDebounce = (val, delay = 1000) => {
  const [debounedValue, setDebounedValue] = useState(val);
  useEffect(() => {
    const t = setTimeout(() => {
      setDebounedValue(val);
    }, delay);

    return () => clearTimeout(t);
  }, [val]);

  return debounedValue;
};

export default useDebounce;
