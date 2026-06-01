import React, { useState } from "react";
import { Star } from "lucide-react";

const FeedBackForm = () => {
  const [rating, setRating] = useState(null);
  const [hover, setHover] = useState(null);

  return (
    <div className="border m-4 flex flex-col gap-2 justify-center items-center h-40">
      <input type="text" className="border" />

      <div className="flex gap-1">
        {Array.from({ length: 5 }).map((_, index) => (
          <span
            key={index}
            className="cursor-pointer"
            onClick={() => setRating(index)}
            onMouseOver={() => setHover(index)}
            onMouseLeave={() => setHover(null)}
          >
            <Star
              color={
                (hover !== null && hover >= index) ||
                (hover === null && rating !== null && rating >= index)
                  ? "yellow"
                  : "black"
              }
            />
          </span>
        ))}
      </div>

      <button>Feedback {rating !== null ? rating + 1 : 0}</button>
    </div>
  );
};

export default FeedBackForm;
