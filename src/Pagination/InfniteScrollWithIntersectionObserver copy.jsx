import React, { useRef, useState, useEffect } from "react";

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
  endIndex = endIndex + 10;

  return arr;
};

const InfniteScrollWithIntersectionObserver = () => {
  const [data, setData] = useState(getData);

  const lastElement = useRef(null);
  const obserberRef = useRef(null);

  console.log(lastElement);

  useEffect(() => {
    if (!lastElement.current) return;
    obserberRef.current = new IntersectionObserver(([{ isIntersecting }]) => {
      if (isIntersecting){
        setData(p => [...p, ...getData()])
      }
    });

    obserberRef.current.observe(lastElement.current);

    return () => {
      if (lastElement.current) {
        obserberRef.current.unobserve(lastElement.current);
      }
    };
  }, []);

  return (
    <div className="flex justify-center items-center flex-col gap-2">
      <h1>Infinite Scroll With Height</h1>

      <div className="p-2 gap-2 itemsWrapper flex  flex-wrap justify-center items-center">
        {data.map((item) => (
          <div
            key={item.id}
            className="singleItem border h-50 w-40 flex flex-col gap-2 items-center justify-center"
          >
            <h1>{item.id}</h1>

            <h1 className="w-full break-words px-2">{item.label}</h1>
          </div>
        ))}
      </div>
      <h1 ref={lastElement}>Load More</h1>
    </div>
  );
};

export default InfniteScrollWithIntersectionObserver;
