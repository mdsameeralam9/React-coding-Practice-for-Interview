import React, { useState } from "react";

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

const InfniteScrollWithHeight = () => {
  const [data, setData] = useState(getData);

  const handleScrollEvent = (e) => {
    const element = e.target;

    const scrollTop = element.scrollTop;
    const clientHeight = element.clientHeight;
    const scrollHeight = element.scrollHeight;

    console.log({
      scrollTop,
      clientHeight,
      scrollHeight,
    });

    {
      /**
        
    scrollTop → how much scrolled
    clientHeight → visible container height
    scrollHeight → total scrollable height   
        
    The maximum value of scrollTop is actually:

    scrollHeight - clientHeight

    scrollHeight = 1000px
    clientHeight = 300px

    So maximum possible scroll is: 1000 - 300 = 700px
        
    */
    }

    // reached bottom
    if (scrollTop + clientHeight >= scrollHeight - 5) {
      setData((prev) => [...prev, ...getData()]);
    }
  };

  return (
    <div className="flex justify-center items-center w-full h-screen flex-col gap-2">
      <h1>Infinite Scroll With Height</h1>

      <div
        onScroll={handleScrollEvent}
        className="p-2 gap-2 itemsWrapper flex flex-wrap justify-between border w-[80%] h-[80%] overflow-auto"
      >
        {data.map((item) => (
          <div
            key={item.id}
            className="singleItem border h-30 w-20 flex flex-col gap-2 items-center justify-center"
          >
            <h1>{item.id}</h1>

            <h1 className="w-full break-words px-2">{item.label}</h1>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InfniteScrollWithHeight;
