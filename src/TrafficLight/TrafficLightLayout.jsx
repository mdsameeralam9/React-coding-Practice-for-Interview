import React, { useEffect, useState } from "react";

const timeInSec = {
  red: 2,
  yellow: 1,
  green: 4,
};

const TrafficLightLayout = () => {
  const [active, setActive] = useState("red");
  const [sec, setSec] = useState(0);

  useEffect(() => {
    const tId = setInterval(() => {
      setSec((prevSec) => {
        const updatedSec = prevSec + 1;

        if (updatedSec >= timeInSec[active]) {
          setActive((prevActive) => {
            if (prevActive === "red") return "yellow";
            if (prevActive === "yellow") return "green";
            return "red";
          });

          return 0;
        }

        return updatedSec;
      });
    }, 1000);

    return () => clearInterval(tId);
  }, [active]);

  console.log(sec)

  return (
    <div>
      <div
        style={{
          background: active === "red" ? "red" : "gray",
        }}
        className="rounded-full w-20 h-20 border"
      ></div>

      <div
        style={{
          background: active === "yellow" ? "yellow" : "gray",
        }}
        className="rounded-full w-20 h-20 border"
      ></div>

      <div
        style={{
          background: active === "green" ? "green" : "gray",
        }}
        className="rounded-full w-20 h-20 border"
      ></div>

      <h1>{sec}</h1>
    </div>
  );
};

export default TrafficLightLayout;
