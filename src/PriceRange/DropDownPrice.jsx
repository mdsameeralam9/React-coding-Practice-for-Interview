// DropDownPrice.jsx

import React from "react";

const DropDownPrice = ({
  label = "Min",
  optionItem = [],
  onChange = () => {},
  selectedValue,
}) => {
  return (
    <div className="w-full flex flex-col gap-1">
      <label className="text-sm font-medium">{label}</label>

      <select
        value={selectedValue}
        onChange={onChange}
        className="border p-2 rounded w-full"
      >
        {optionItem.map((item) => (
          <option key={item.id} value={item.value}>
            {item.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default DropDownPrice;