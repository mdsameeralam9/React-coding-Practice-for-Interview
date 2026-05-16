import React, { useState } from "react";
import "./styles.css";

export default function PriceRangeSlider({
  MIN = 0,
  MAX = 10000,
  STEP = 100,
}) {
  const [minValue, setMinValue] = useState(2000);
  const [maxValue, setMaxValue] = useState(8000);

  // Min Change
  const handleMinChange = (e) => {
    const value = Math.min(Number(e.target.value), maxValue);

    if (value <= maxValue) {
      setMinValue(value);
    }
  };

  // Max Change
  const handleMaxChange = (e) => {
    const value = Math.max(Number(e.target.value), minValue);

    if (value >= minValue) {
      setMaxValue(value);
    }
  };

  // Percent Calculation
  const getPercent = (value) =>
    ((value - MIN) / (MAX - MIN)) * 100;

  const minPercent = getPercent(minValue);
  const maxPercent = getPercent(maxValue);

  return (
    <div className="slider-container">
      <h2>Price Range</h2>

      {/* Inputs */}
      <div className="inputs">
        <div>
          <label>Min Price:</label>

          <input
            data-testid="min-input"
            type="number"
            value={minValue}
            min={MIN}
            max={MAX}
            step={STEP}
            onChange={handleMinChange}
          />
        </div>

        <div>
          <label>Max Price:</label>

          <input
            data-testid="max-input"
            type="number"
            value={maxValue}
            min={MIN}
            max={MAX}
            step={STEP}
            onChange={handleMaxChange}
          />
        </div>
      </div>

      {/* Slider */}
      <div
        className="slider-track"
        data-testid="slider-track"
      >
        {/* Active Range */}
        <div
          className="slider-active-range"
          data-testid="slider-active-range"
          style={{
            left: `${minPercent}%`,
            width: `${maxPercent - minPercent}%`,
          }}
        />

        {/* Min Label */}
        <div
          className="slider-label"
          style={{ left: `${minPercent}%` }}
          data-testid="min-label"
        >
          ₹{minValue}
        </div>

        {/* Max Label */}
        <div
          className="slider-label"
          style={{ left: `${maxPercent}%` }}
          data-testid="max-label"
        >
          ₹{maxValue}
        </div>

        {/* Min Slider */}
        <input
          data-testid="min-slider"
          type="range"
          min={MIN}
          max={MAX}
          value={minValue}
          step={STEP}
          onChange={handleMinChange}
          className="thumb thumb--left"
        />

        {/* Max Slider */}
        <input
          data-testid="max-slider"
          type="range"
          min={MIN}
          max={MAX}
          value={maxValue}
          step={STEP}
          onChange={handleMaxChange}
          className="thumb thumb--right"
        />
      </div>
    </div>
  );
}