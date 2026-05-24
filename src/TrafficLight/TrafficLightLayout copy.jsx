import React, { useEffect, useRef, useState } from "react";

const timeInSec = { red: 2, yello: 1, green: 4 };

const TrafficLightLayout = () => {
  const [active, setActive] = useState("red");
  const [sec, setSec] = useState(1);

  useEffect(() => {
    const tId = setInterval(() => {
      setSec((s) => s + 1);
      let currentActive = active;
      if (active === "red" && sec === timeInSec.red) {
        currentActive = "yellow";
        setSec(0);
      } else if (active === "yellow" && sec === timeInSec.yello) {
        currentActive = "green";
        setSec(0);
      } else if (active === "green" && sec === timeInSec.green) {
        currentActive = "red";
        setSec(0);
      }

      setActive(currentActive);
    }, 1000);

    return () => clearInterval(tId);
  }, [sec]);

  console.log(sec, active);

  // first approach for every second same 

  //     useEffect(() => {
  //    const tId =  setInterval(() => {
  //         let currentActive = ''
  //         if(active === 'red'){
  //             currentActive = 'yellow'
  //         } else  if(active === 'yellow'){
  //             currentActive = 'green'
  //         }  else  if(active === 'green'){
  //             currentActive = 'red'
  //         }

  //         setActive(currentActive)
  //     }, 1000)

  //     return () => clearInterval(tId)
  //   }, [active])

  return (
    <div>
      <div
        style={{ background: ` ${active === "red" ? "red" : "gray"}` }}
        className="circle rounded-full w-20 h-20 border"
      ></div>
      <div
        style={{ background: ` ${active === "yellow" ? "yellow" : "gray"}` }}
        className="circle rounded-full w-20 h-20 border"
      ></div>
      <div
        style={{ background: ` ${active === "green" ? "green" : "gray"}` }}
        className="circle rounded-full w-20 h-20 border"
      ></div>
    </div>
  );
};

export default TrafficLightLayout;
