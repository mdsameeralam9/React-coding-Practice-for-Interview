import React, { useEffect, useState } from "react";
import "./style.css";

const SequentialProgressBarsLayout = () => {
  const [renderCount, setRenderCount] = useState([]);
  const [active, setActive] = useState(null);

  const addRender = () => {
    const id = renderCount.length + 1;
    const shouldRun = active === null;

    setRenderCount((prev) => [
      ...prev,
      {
        id,
        isRunnung: shouldRun,
      },
    ]);

    if (shouldRun) {
      setActive(id);
    }
  };

  const startNew = (currentId) => {
    const nextBar = renderCount.find((item) => item.id > currentId);

    if (!nextBar) {
      setActive(null);

      setRenderCount((prev) =>
        prev.map((item) => ({
          ...item,
          isRunnung: false,
        }))
      );

      return;
    }

    setActive(nextBar.id);

    setRenderCount((prev) =>
      prev.map((item) => ({
        ...item,
        isRunnung: item.id === nextBar.id,
      }))
    );
  };

  return (
    <div className="container">
      <button className="button" onClick={addRender}>
        Render New Progress Component
      </button>

      {renderCount.map((item) => (
        <ProgressBar
          key={item.id}
          item={item}
          startNew={startNew}
        />
      ))}
    </div>
  );
};

export default SequentialProgressBarsLayout;

const ProgressBar = ({ item, startNew }) => {
  const [progWidth, setProgWidth] = useState(0);

  useEffect(() => {
    if (!item.isRunnung || progWidth === 100) return;

    const intervalId = setInterval(() => {
      setProgWidth((prev) => {
        const next = prev + 25;

        if (next >= 100) {
          clearInterval(intervalId);
          return 100;
        }

        return next;
      });
    }, 500);

    return () => clearInterval(intervalId);
  }, [item.isRunnung]);

  useEffect(() => {
    if (progWidth === 100) {
      startNew(item.id);
    }
  }, [progWidth]);

  return (
    <div className="wrapper">
      <div
        className="progress"
        style={{
          width: `${progWidth}%`,
        }}
      />

      <div className="progressText">
        {item.id} - {progWidth}%
      </div>
    </div>
  );
};