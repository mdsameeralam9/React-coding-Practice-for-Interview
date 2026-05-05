import { useState } from "react";
import Progress from "./Progress";

const ProgressBar = () => {
  const [progressState, setProgressState] = useState(0);

  const changeProgress = (val: number) => {
    setProgressState((prev) => {
      const next = prev + val;
      return Math.min(100, Math.max(0, next));
    });
  };

  return (
    <div className="flex flex-col gap-2 items-center justify-center">
      <h1>Progress Bar</h1>
      <Progress progressState={progressState} />

      <div className="flex gap-1">
        <button
          disabled={progressState === 0}
          onClick={() => changeProgress(-10)}
          className="cursor-pointer border bg-red-500 text-white py-1 px-4 rounded-2xl disabled:bg-gray-300"
        >
          -10%
        </button>

        <button
          disabled={progressState === 100}
          onClick={() => changeProgress(10)}
          className="cursor-pointer  border bg-blue-500 text-white py-1 px-4 rounded-2xl disabled:bg-gray-300"
        >
          +10%
        </button>
      </div>
    </div>
  );
};

export default ProgressBar;
