// PriceRangeLayout.jsx

import React, { useState } from "react";
import DropDownPrice from "./DropDownPrice";

const prices = [0, 100, 200, 300, 400, 500, 700, 1000];

const PriceRangeLayout = () => {
  const [minPrice, setMinPrice] = useState(100);
  const [maxPrice, setMaxPrice] = useState(700);

  // Min dropdown options
  const minOptions = prices
    .filter((item) => item < maxPrice)
    .map((item, index) => ({
      id: index,
      value: item,
      label: item === 0 ? "Min" : `₹ ${item}`,
    }));

  // Max dropdown options
  const maxOptions = prices
    .filter((item) => item > minPrice)
    .map((item, index) => ({
      id: index,
      value: item,
      label: `₹ ${item}`,
    }));

  // Dropdown Change
  const handleMinChange = (e) => {
    const value = Number(e.target.value);

    if (value < maxPrice) {
      setMinPrice(value);
    }
  };

  const handleMaxChange = (e) => {
    const value = Number(e.target.value);

    if (value > minPrice) {
      setMaxPrice(value);
    }
  };

  // Slider Change
  const handleMinSlider = (e) => {
    const value = Number(e.target.value);

    if (value < maxPrice) {
      setMinPrice(value);
    }
  };

  const handleMaxSlider = (e) => {
    const value = Number(e.target.value);

    if (value > minPrice) {
      setMaxPrice(value);
    }
  };

  return (
    <div className="border w-[450px] p-4 rounded flex flex-col gap-4">
      {/* Header */}
      <div className="flex justify-between">
        <h1 className="font-bold">Price</h1>

        <button
          onClick={() => {
            setMinPrice(0);
            setMaxPrice(1000);
          }}
        >
          Clear
        </button>
      </div>

      {/* Slider */}
      <div className="relative h-10 flex items-center">
        {/* Background Line */}
        <div className="absolute w-full h-1 bg-gray-300 rounded"></div>

        {/* Active Range */}
        <div
          className="absolute h-1 bg-black rounded"
          style={{
            left: `${(minPrice / 1000) * 100}%`,
            right: `${100 - (maxPrice / 1000) * 100}%`,
          }}
        ></div>

        {/* Min Slider */}
        <input
          type="range"
          min={0}
          max={1000}
          step={100}
          value={minPrice}
          onChange={handleMinSlider}
          className="absolute w-full pointer-events-none appearance-none bg-transparent
          [&::-webkit-slider-thumb]:pointer-events-auto
          [&::-webkit-slider-thumb]:appearance-none
          [&::-webkit-slider-thumb]:h-4
          [&::-webkit-slider-thumb]:w-4
          [&::-webkit-slider-thumb]:rounded-full
          [&::-webkit-slider-thumb]:bg-black"
        />

        {/* Max Slider */}
        <input
          type="range"
          min={0}
          max={1000}
          step={100}
          value={maxPrice}
          onChange={handleMaxSlider}
          className="absolute w-full pointer-events-none appearance-none bg-transparent
          [&::-webkit-slider-thumb]:pointer-events-auto
          [&::-webkit-slider-thumb]:appearance-none
          [&::-webkit-slider-thumb]:h-4
          [&::-webkit-slider-thumb]:w-4
          [&::-webkit-slider-thumb]:rounded-full
          [&::-webkit-slider-thumb]:bg-black"
        />
      </div>

      {/* Values */}
      <div className="flex justify-between">
        <p>₹ {minPrice}</p>
        <p>₹ {maxPrice}</p>
      </div>

      {/* Dropdowns */}
      <div className="flex gap-2">
        <DropDownPrice
          label="Min"
          optionItem={minOptions}
          selectedValue={minPrice}
          onChange={handleMinChange}
        />

        <DropDownPrice
          label="Max"
          optionItem={maxOptions}
          selectedValue={maxPrice}
          onChange={handleMaxChange}
        />
      </div>
    </div>
  );
};

export default PriceRangeLayout;
