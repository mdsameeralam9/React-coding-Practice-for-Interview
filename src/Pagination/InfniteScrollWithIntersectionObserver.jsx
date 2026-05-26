import React, { useCallback, useRef, useState } from "react";

let startIndex = 0;
let endIndex = 10;

const getData = () => {
  const arr = [];

  for (let i = startIndex + 1; i <= endIndex; i++) {
    arr.push({
      id: i,
      label: Date.now(),
    });
  }

  startIndex = endIndex;
  endIndex += 10;

  return arr;
};

const InfniteScrollWithIntersectionObserver = () => {
  const [data, setData] = useState(getData);

  const observerRef = useRef(null);

  const lastElementRef = useCallback((node) => {
    // remove old observer
    if (observerRef.current) {
      observerRef.current.disconnect();
    }

    observerRef.current = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setData((prev) => [...prev, ...getData()]);
      }
    });

    if (node) {
      observerRef.current.observe(node);
    }
  }, []);

  return (
    <div className="flex justify-center items-center flex-col gap-2">
      <h1>Infinite Scroll With IntersectionObserver</h1>

      <div className="p-2 gap-2 flex flex-wrap justify-center items-center">
        {data.map((item) => (
          <div
            key={item.id}
            className="border h-50 w-40 flex flex-col gap-2 items-center justify-center"
          >
            <h1>{item.id}</h1>

            <h1 className="w-full break-words px-2">{item.label}</h1>
          </div>
        ))}
      </div>

      {/* target element */}
      <h1 ref={lastElementRef}>Load More</h1>
    </div>
  );
};

export default InfniteScrollWithIntersectionObserver;
