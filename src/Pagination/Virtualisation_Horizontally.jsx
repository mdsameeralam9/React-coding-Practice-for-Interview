import React from 'react';

const getState = () => {
  const result = [];
  const LIMIT = 100;

  for (let i = 1; i <= LIMIT; i++) {
    result.push({
      id: i,
      label: `${i} - Label`,
    });
  }

  return result;
};

const ITEM_WIDTH = 120;
const CONTAINER_WIDTH = 600;
const OVERSCAN = 2;

const RenderList = () => {
  const [state] = React.useState(getState);
  const [scrollLeft, setScrollLeft] = React.useState(0);

  // Which item is currently at the left side?
  const startIndex = Math.floor(scrollLeft / ITEM_WIDTH);

  // How many items can fit inside the container?
  const visibleCount = Math.ceil(CONTAINER_WIDTH / ITEM_WIDTH);

  // Render a few extra items before and after the viewport
  const start = Math.max(0, startIndex - OVERSCAN);

  const end = Math.min(state.length, startIndex + visibleCount + OVERSCAN);

  const visibleItems = state.slice(start, end);

  const handleScroll = (e) => {
    setScrollLeft(e.currentTarget.scrollLeft);
  };

  // Convert mouse-wheel vertical movement into horizontal movement
  const handleWheel = (e) => {
    e.currentTarget.scrollLeft += e.deltaY;
  };

  return (
    <div className="container" onScroll={handleScroll} onWheel={handleWheel}>
      {/* Full virtual width */}
      <div
        className="itemParent"
        style={{
          width: state.length * ITEM_WIDTH,
          height: '60px',
          position: 'relative',
        }}
      >
        {/* Only visible items are rendered */}
        {visibleItems.map((item, index) => {
          const actualIndex = start + index;

          return (
            <div
              className="item"
              key={item.id}
              style={{
                position: 'absolute',
                left: actualIndex * ITEM_WIDTH,
                width: ITEM_WIDTH,
              }}
            >
              {item.label}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default RenderList;


{/**
  # Style
  
  .container {
  width: 600px;
  height: 60px;

  overflow-x: auto;
  overflow-y: hidden;

  border: 1px solid #333;
}

.itemParent {
  position: relative;
}

.item {
  height: 50px;
  box-sizing: border-box;

  display: flex;
  align-items: center;
  justify-content: center;

  border: 1px solid #ccc;
  background: #f5f5f5;
}

    
    
*/}