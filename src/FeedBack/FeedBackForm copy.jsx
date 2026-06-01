import React, { useState } from "react";
import { Star } from "lucide-react";

const FeedBackForm = () => {
  const [icons, setIcons] = useState(null);
  const [hoverIcons, setHoverIcons] = useState(null);


  const actiVateIcon = (index) => {
    setIcons(index);
  };

  const handleHover = (index) => {
    setHoverIcons(index);
  };

  const handleRemove = () => {
    setHoverIcons(null);
  };

  // const activeIndex = (hoverIcons && hoverIcons >= 4) || (icons && icons >= 4);

  return (
    <div className="border m-4 flex flex-col gap-1 justify-center items-center h-40">
      <input type="text" className="border" />
      <div className="flex gap-1">
        {new Array(5).fill("").map((elm, index) => (
          <span
            className="cursor-pointer"
            onClick={() => actiVateIcon(index)}
            // onHover={() => handleHover(index)}
            onMouseOver={() => handleHover(index)}
            onMouseLeave={handleRemove}
          >
            <Star
              color={
                (hoverIcons && hoverIcons >= index) || (!hoverIcons && icons && icons >= index)
                  ? "yellow"
                  : "black"
              }
            />
          </span>
        ))}
      </div>

      <button>Feedback {icons + 1}</button>
    </div>
  );
};

export default FeedBackForm;
