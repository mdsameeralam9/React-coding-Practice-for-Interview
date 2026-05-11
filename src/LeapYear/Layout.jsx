import React, { useState } from "react";

const LeapYearChecker = () => {
  const [year, setYear] = useState("");
  const [result, setResult] = useState("");

  const checkLeapYear = () => {
    const y = Number(year);

    if (!year) {
      setResult("Please enter a year");
      return;
    }

    // Leap year logic
    if ((y % 4 === 0 && y % 100 !== 0) || y % 400 === 0) {
      setResult(`${y} is a Leap Year ✅`);
    } else {
      setResult(`${y} is NOT a Leap Year ❌`);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="border p-6 rounded flex flex-col gap-4 w-[300px]">
        <h1 className="text-2xl font-bold">Leap Year Checker</h1>

        <input
          type="number"
          placeholder="Enter year"
          value={year}
          onChange={(e) => setYear(e.target.value)}
          className="border p-2 rounded"
        />

        <button
          onClick={checkLeapYear}
          className="bg-blue-500 text-white py-2 rounded"
        >
          Check
        </button>

        <h2 className="text-lg font-semibold">{result}</h2>
      </div>
    </div>
  );
};

export default LeapYearChecker;