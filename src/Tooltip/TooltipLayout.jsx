import React, { useState } from "react";

const TooltipLayout = () => {
  const [isHover, setIsHover] = useState(false);
  const [hoverIndex, setHoverIndex] = useState(null);

  const tooltipData = [
    {
      id: 1,
      label: "Home",
      icon: "Home",
    },
    {
      id: 2,
      label: "Profile",
      icon: "User",
    },
    {
      id: 3,
      label: "Notifications",
      icon: "Bell",
    },
    {
      id: 4,
      label: "Settings",
      icon: "Settings",
    },
  ];

  const mouseEnter = (id) => {
    setHoverIndex(id);
    setIsHover(true);
  };

  const mouseLeave = () => {
    setIsHover(false);
    setHoverIndex(null);
  };

  return (
    <div>
      <h1>Tooltip</h1>

      <div className="items flex gap-2 m-10">
        {tooltipData.map((data) => {
          return (
            <div className="itm" key={data.id}>
              <p
                className="border bg-gray-200 py-0.5 px-3 cursor-pointer rounded"
                onMouseEnter={() => mouseEnter(data.id)}
                onMouseLeave={mouseEnter}
              >
                {data.icon}
              </p>

              {isHover && hoverIndex === data.id && (
                <p className="absolute top-2 border bg-gray-200 py-0.5 px-3 cursor-pointer rounded">
                  {data.label}
                </p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TooltipLayout;
