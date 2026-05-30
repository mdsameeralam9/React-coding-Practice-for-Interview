import React, { useEffect, useRef } from "react";

const GridLightLayout = () => {
  const [arr, setArr] = React.useState([]);
  const ref = useRef(null);

  useEffect(() => {
    if (arr.length !== 9) return;
    ref.current = setInterval(() => {
      setArr((p) => {
        const copy = p.slice();
        copy.pop();
        if (copy.length === 9) {
          clearInterval(ref.current);
        }
        return copy;
      });
    }, 300);

    // return () => clearInterval(ref.current);
  }, [arr.length]);

  const hand = (index) => {
    const c = arr.slice();
    if (c.includes(index)) return;

    c.push(index);
    setArr(c);
  };

  console.log(arr);

  return (
    <div>
      <h1>GridLightLayout</h1>
      <div className="celas grid grid-cols-3 grid-rows-3 border w-60 h-60">
        {new Array(9).fill("").map((_, index) => (
          <div
            key={index}
            onClick={() => hand(index)}
            className="cel border h-20 w-20"
            style={{ background: arr?.includes(index) ? "green" : "" }}
          >
            {index}
          </div>
        ))}
      </div>
    </div>
  );
};

export default GridLightLayout;
