import React, { useState, useMemo, useCallback } from "react";

export default function DynamicGrid() {
  const [size, setSize] = useState(3);

  const [cells, setCells] = useState(Array(3 * 3).fill(null));

  const [maxValue, setMaxValue] = useState(0);

  const handleSizeChange = (e) => {
    const value = Number(e.target.value);

    if (value < 1) return;

    setSize(value);
    setCells(Array(value * value).fill(null));
    setMaxValue(0);
  };

  const handleCellClick = useCallback(
    (index) => {
      setCells((prev) => {
        const next = [...prev];

        if (next[index] == null) {
          const newValue = maxValue + 1;
          next[index] = newValue;
          setMaxValue(newValue);
        } else {
          next[index] = maxValue;
        }

        return next;
      });
    },
    [maxValue],
  );

  const gridStyle = useMemo(
    () => ({
      gridTemplateColumns: `repeat(${size}, 1fr)`,
    }),
    [size],
  );

  return (
    <div className="p-4">
      <input
        type="number"
        min="1"
        value={size}
        onChange={handleSizeChange}
        className="border p-2 mb-4"
      />

      <div className="grid gap-2" style={gridStyle}>
        {cells.map((value, index) => (
          <GridCell
            key={index}
            value={value}
            onClick={() => handleCellClick(index)}
          />
        ))}
      </div>
    </div>
  );
}

const GridCell = React.memo(({ value, onClick }) => {
  return (
    <button
      className="border h-16 flex items-center justify-center"
      onClick={onClick}
    >
      {value ?? ""}
    </button>
  );
});
