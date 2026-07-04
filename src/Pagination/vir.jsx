import React from "react";
import "./style.css";

const ITEM_HEIGHT = 40;
const CONTAINER_HEIGHT = 400;
const OVERSCAN = 5;

function getItems() {
  return Array.from({ length: 100 }, (_, i) => i + 1);
}

export default function App() {
  const items = React.useMemo(() => getItems(), []);

  const [scrollTop, setScrollTop] = React.useState(0);

  const visibleCount = Math.ceil(CONTAINER_HEIGHT / ITEM_HEIGHT);

  const startIndex = Math.max(
    0,
    Math.floor(scrollTop / ITEM_HEIGHT) - OVERSCAN
  );

  const endIndex = Math.min(
    items.length,
    startIndex + visibleCount + OVERSCAN * 2
  );

  const visibleItems = items.slice(startIndex, endIndex);

  return (
    <>
      <h2>Virtualized List (using position + top)</h2>

      <div
        className="container"
        onScroll={(e) => setScrollTop(e.target.scrollTop)}
      >
        {/* Total scrollable height */}
        <div
          className="spacer"
          style={{
            height: items.length * ITEM_HEIGHT,
          }}
        >
          {/* Visible items */}
          <div
            className="visibleList"
            style={{
              top: startIndex * ITEM_HEIGHT,
            }}
          >
            {visibleItems.map((item) => (
              <div
                key={item}
                className="item"
                style={{
                  height: ITEM_HEIGHT,
                }}
              >
                Item {item}
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}


{

    /**
     * 
    .container {
  width: 300px;
  height: 400px;
  overflow-y: auto;
  border: 1px solid black;
}

.spacer {
  position: relative;
  width: 100%;
}

.visibleList {
  position: absolute;
  left: 0;
  right: 0;
}

.item {
  height: 40px;
  box-sizing: border-box;
  border-bottom: 1px solid #ddd;
  background: lightskyblue;

  display: flex;
  align-items: center;
  justify-content: center;
}
     *  
     */
}