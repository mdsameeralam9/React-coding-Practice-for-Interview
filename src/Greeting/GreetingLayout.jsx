import React, { useEffect, useState } from "react";

const GreetingLayout = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timerId = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(timerId);
  }, []);

  const currentHour = time.getHours();

  let greeting = "";

  if (currentHour >= 5 && currentHour < 12) {
    greeting = "Good Morning! ☀️";
  } else if (currentHour >= 12 && currentHour < 17) {
    greeting = "Good Afternoon! 🌤️";
  } else if (currentHour >= 17 && currentHour < 21) {
    greeting = "Good Evening! 🌆";
  } else {
    greeting = "Good Night! 🌙";
  }

  return (
    <div className="border w-full h-screen flex items-center justify-center flex-col gap-5">
      <h1 className="text-4xl font-bold">{greeting}</h1>

      <div className="timersection bg-lime-200 py-3 px-6 rounded shadow">
        <h2 className="text-3xl font-semibold">{time.toLocaleTimeString()}</h2>
      </div>
    </div>
  );
};

export default GreetingLayout;
