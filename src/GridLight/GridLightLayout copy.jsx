import React, { useEffect, useRef } from "react";

const GridLightLayout = () => {
  const [arr, setArr] = React.useState([]);
  const [isStartPop, setIsStartPop] = React.useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const copy = arr.slice();
    if (copy.length === 0 && ref.current) {
      clearInterval(ref.current);
      return;
    }

    if (copy.length === 9) {
      ref.current = setInterval(() => {
        copy.pop();
        console.log(copy);
        setArr(copy);
      }, 300);
    }

    // return () => clearInterval(ref.current);
  }, [arr]);

  const hand = (index) => {
    const c = arr.slice();
    c.push(index);
    setArr(c);
  };

  console.log(arr, isStartPop);

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
