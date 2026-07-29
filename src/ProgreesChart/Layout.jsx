import React, { useState, useEffect, useRef } from "react";
import "./style.css";

const getColorData = () => {
  return [
    { id: 1, bgColor: "#FF5733", width: 5 },
    { id: 2, bgColor: "#33C1FF", width: 8 },
    { id: 3, bgColor: "#28A745", width: 12 },
    { id: 4, bgColor: "#FFC107", width: 10 },
    { id: 5, bgColor: "#6F42C1", width: 15 },
    { id: 6, bgColor: "#E83E8C", width: 9 },
    { id: 7, bgColor: "#20C997", width: 11 },
    { id: 8, bgColor: "#FD7E14", width: 13 },
    { id: 9, bgColor: "#17A2B8", width: 7 },
    { id: 10, bgColor: "#DC3545", width: 10 },
  ];
};

const ProgressChart = () => {
  const [data] = useState(getColorData);
  const [progressState, setProgressState] = useState(0);

  const pregRef = useRef(0);

  useEffect(() => {
    const timerID = setInterval(() => {
      setProgressState(p => {
        if(p === 100){
            clearInterval(timerID);
            return p
        };

        return Math.min(100, p+10)
      })
    }, 1000);

    return () => clearInterval(timerID);
  }, []);

  const progress = progressState; // %
  console.log(progressState)

  return (
    <div className="wrapper">
      <div className="graybg">
        {data.map((d) => (
          <div
            className="graybg1"
            style={{ width: `${d.width}%`, backgroundColor: d.bgColor }}
          >
            {d.width}%
          </div>
        ))}
      </div>

      <div
        className="circle"
        style={{
          "--progress": `${progress * 3.6}deg`,
        }}
      >
        <div className="circleInner">{progress}%</div>
      </div>
    </div>
  );
};

export default ProgressChart;
