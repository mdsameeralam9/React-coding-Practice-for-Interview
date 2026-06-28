import React, { useState, useMemo } from "react";

const Virtualisation = () => {
  const [data] = useState(
    Array.from({ length: 500 }, (_, i) => ({
      id: i + 1,
      label: `Product ${i + 1}`,
    }))
  );

  const [scrollTop, setScrollTop] = useState(0);

  // Scroll handler
  const handleScrollEvemt = (e) => {
    setScrollTop(e.target.scrollTop);
  };

  const containerHeight = 400;
  const ItemHeight = 40;

  // Total height
  const ItemHeightParent = data.length * ItemHeight;

  // Visible items
  const itemToVisibleatUI =
    Math.ceil(containerHeight / ItemHeight) + 1;

  const startIndex = Math.floor(scrollTop / ItemHeight);
  const endIndex = startIndex + itemToVisibleatUI;

  const filterList = useMemo(() => {
    return data.slice(startIndex, endIndex);
  }, [data, startIndex, endIndex]);

  // styles
  const containerStyle = {
    height: `${containerHeight}px`,
    border: "1px solid #ccc",
    width: "350px",
    overflowY: "auto",
    margin: "2rem",
  };

  const ItemStyleParent = {
    height: `${ItemHeightParent}px`,
    position: "relative",
  };

  return (
    <div style={containerStyle} onScroll={handleScrollEvemt}>
      <div style={ItemStyleParent}>
        {filterList.map((da, index) => (
          <div
            key={da.id}
            style={{
              position: "absolute",
              top: `${(startIndex + index) * ItemHeight}px`,
              left: 0,
              right: 0,
              height: `${ItemHeight}px`,
              borderBottom: "1px solid #ddd",
              background: "#60a5fa",
              display: "flex",
              alignItems: "center",
              paddingLeft: "10px",
              boxSizing: "border-box",
            }}
          >
            {da.id}. {da.label}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Virtualisation;