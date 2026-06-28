import React, { useState, useMemo } from "react";

const Virtualisation = () => {
  const [data, setData] = useState(
    Array.from({ length: 50 }, (_, i) => ({
      id: i + 1,
      label: `Product ${i + 1}`,
    })),
  );
  const [scrollTop, setScrollTop] = useState(0);

  //handleScrollEvemt
  const handleScrollEvemt = (e) => {
    setScrollTop(e.target.scrollTop);
  };

  const containerHeight = 400;
  const ItemHeight = 40;
  const ItemHeightParent = data.length * ItemHeight;

  const itemToVisibleatUI = containerHeight/ItemHeight;

  const startIndx = Math.floor(scrollTop/ItemHeight);
  const endIndx = startIndx+itemToVisibleatUI;

  const startIndex = startIndx;
  const endIndex = endIndx;

  const filterList = useMemo(() => {
    return data.slice(startIndex, endIndex);
  }, [startIndex, endIndex]);

  // styles
  const containerStyle = {
    height: `${containerHeight}px`,
    border: "1px solid #ccc",
    width: "350px",
    overflow: "auto",
    margin: "2rem",
  };

  //ItemStyle parent
  const ItemStyleParent = {
    height: `${ItemHeight}px`,
  };

  // ItemStyle
  const itemStyle = {
    height: `${ItemHeight}px`,
  };

  return (
    <div style={containerStyle} onScroll={handleScrollEvemt}>
      <div className="flex flex-col gap-1" style={ItemStyleParent}>
        {filterList.map((da) => (
          <p className="bg-blue-400" key={da.id} style={itemStyle}>
            {da.id} {da.label}
          </p>
        ))}
      </div>
    </div>
  );
};

export default Virtualisation;
