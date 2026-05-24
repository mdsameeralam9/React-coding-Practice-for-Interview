import { useState, useEffect, useRef } from "react";

const getTimes = (sec) => {
  let second = 0,
    minutes = 0,
    hours = 0;

  hours = Math.floor(sec / 3600);
  minutes = Math.floor((sec % 3600) / 60);
  second = Math.floor(sec % 60);

  hours = hours < 10 ? `0${hours}` : hours;
  minutes = minutes < 10 ? `0${minutes}` : minutes;
  second = second < 10 ? `0${second}` : second;

  return (
    <h1>
      {hours} : {minutes} : {second}
    </h1>
  );
};

const StopWatchLayout = () => {
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(true);
  const timerRef = useRef(null);

  const startTimer = () => {
    timerRef.current = setInterval(() => {
      setSeconds((p) => p + 1);
    }, 1);
  };

  useEffect(() => {
    startTimer();
    return () => clearInterval(timerRef.current);
  }, []);

  const handleRunnning = () => {
    if (isRunning) {
      clearInterval(timerRef.current);
      setIsRunning(false);
    } else {
      startTimer();
      setIsRunning(true);
    }
  };

  const reset = () => {
    setSeconds(0);
    setIsRunning(true);
    timerRef.current = null
    startTimer();
  };

  const { hours = 0, minutes = 0, second = 0 } = getTimes(isRunning);

  return (
    <div className="flex justify-center items-center w-full h-screen flex-col gap-2">
      <h1>Stop Watch</h1>

      <div className="border w-20 h-10 flex justify-center items-center">
        <h1>{getTimes(seconds)}</h1>
      </div>

      <div className="action flex gap-1">
        <button className="px-4 border cursor-pointer" onClick={handleRunnning}>
          {isRunning ? "Stop" : "Resume"}
        </button>
        <button className="px-4 border cursor-pointer" onClick={reset}>
          Reset
        </button>
      </div>
    </div>
  );
};

export default StopWatchLayout;
