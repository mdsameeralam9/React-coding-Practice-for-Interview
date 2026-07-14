import React, { useEffect, useRef, useState } from "react";
import "./style.css";

const ProgressBar3Simutaneous = () => {
  const [progresData, setProgresData] = useState([]);
  const progCount = useRef(0);

  const addProgressBar = () => {
    progCount.current++;

    const runningCount = progresData.filter(
      (item) => item.isRun && !item.completed,
    ).length;

    const progData = {
      index: progCount.current,
      isRun: runningCount < 3, // Only first 3 start immediately
      completed: false,
    };

    setProgresData((prev) => [...prev, progData]);
  };

  const complete = (index) => {
    setProgresData((prev) => {
      // Mark current progress bar completed
      let updated = prev.map((item) =>
        item.index === index
          ? {
              ...item,
              isRun: false,
              completed: true,
            }
          : item,
      );

      // Find first waiting progress bar
      const nextWaiting = updated.find(
        (item) => !item.isRun && !item.completed,
      );

      // Start it
      if (nextWaiting) {
        updated = updated.map((item) =>
          item.index === nextWaiting.index ? { ...item, isRun: true } : item,
        );
      }

      return updated;
    });
  };

  return (
    <div className="ProgressBar3Simutaneous">
      <button
        onClick={addProgressBar}
        className="cursor-pointer bg-black text-white px-4 rounded-2xl text-center mb-2"
      >
        Add Progress Bar
      </button>

      {progresData.map((progD) => (
        <ProgressBar key={progD.index} data={progD} complete={complete} />
      ))}
    </div>
  );
};

export default ProgressBar3Simutaneous;

const ProgressBar = ({ data, complete }) => {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    if (!data.isRun || data.completed) return;

    const id = setInterval(() => {
      setWidth((prev) => {
        const next = Math.min(prev + 10, 100);

        if (next === 100) {
          clearInterval(id);
          complete(data.index);
        }

        return next;
      });
    }, 1000);

    return () => clearInterval(id);
  }, [data.isRun]);

  return (
    <div className="container">
      <div className="gray">
        <p>{width}%</p>
      </div>

      <div className="green" style={{ width: `${width}%` }} />
    </div>
  );
};
