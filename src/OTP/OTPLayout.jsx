import React, { useEffect, useRef, useState } from "react";

const OTPLayout = () => {
  // const [otp, setOtp] =  useState(Array.from({length: 4}, (_, index) => ''));
  const [otp, setOtp] = useState(new Array(4).fill(""));
  const otpInputRef = useRef([]);

  //handleChange
  const handleChange = (e, index) => {
    let value = e.target.value;
    // value must be number as of now
    if (value && !(/\d/.test(value) || /[0-9]/.test(value))) {
       return
    }


    // set value to state and move to next index
    const copyOtp = otp.slice();
    value = value.slice(-1);
    copyOtp[index] = value; // last value always
    setOtp(copyOtp);
    if (value && index >= 0 && index < otp.length - 1) {
      otpInputRef.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" || e.keyCode === 8) {
      if (!otp[index] && index > 0) {
        otpInputRef.current[index - 1].focus();
      }
    }
  };

  // upon  mount focus on first input
  useEffect(() => {
    otpInputRef.current[0].focus();
  }, []);

  // console.log(otp, otpInputRef)
  return (
    <div className="wrapper flex gap-1 items-center justify-center flex-col">
      <h1>Otp Component</h1>
      <div className="flex gap-1 items-center justify-center">
        {otp.map((val, index) => (
          <input
            value={val}
            key={index}
            type="text"
            className="w-10 h-10 border rounded text-center"
            placeholder={index}
            ref={(inpt) => (otpInputRef.current[index] = inpt)}
            onChange={(e) => handleChange(e, index)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            // maxLength={1}
          />
        ))}
      </div>
    </div>
  );
};

export default OTPLayout;
