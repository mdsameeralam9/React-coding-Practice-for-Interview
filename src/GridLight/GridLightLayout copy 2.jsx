import React, { useEffect, useState } from "react";

const GridLightLayout = () => {
  const [arr, setArr] = useState([]);

  // Remove one by one when all selected
  useEffect(() => {
    console.log('useEffect  called Before')
    if (arr.length !== 9) return;

    console.log('useEffect  called after')
    // let index = arr.length - 1;

    const interval = setInterval(() => {
      setArr((prev) => {
        const copy = [...prev];
        copy.pop();

        // stop interval when empty
        if (copy.length === 0) {
          clearInterval(interval);
        }

        return copy;
      });
    }, 300);

    //return () => clearInterval(interval);
  }, [arr.length]);

  const handleClick = (index) => {
    setArr((prev) => {
      // prevent duplicate click
      if (prev.includes(index)) return prev;

      return [...prev, index];
    });
  };

  console.count(arr);

  return (
    <div>
      <h1>GridLightLayout</h1>

      <div className="grid grid-cols-3 w-60">
        {new Array(9).fill("").map((_, index) => (
          <div
            key={index}
            onClick={() => handleClick(index)}
            className="border h-20 w-20 flex items-center justify-center cursor-pointer"
            style={{
              background: arr.includes(index) ? "green" : "",
            }}
          >
            {index}
          </div>
        ))}
      </div>
    </div>
  );
};

export default GridLightLayout;
