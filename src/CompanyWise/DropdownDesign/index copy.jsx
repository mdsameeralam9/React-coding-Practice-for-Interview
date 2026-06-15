import React, { useState } from "react";
import Dropdown from "./Dropdown";

export default function DropdownLayout() {
  const [country, setCountry] = useState(null);

  const countries = [
    {
      value: "india",
      label: "India",
    },
    {
      value: "usa",
      label: "USA",
    },
    {
      value: "uk",
      label: "UK",
    },
    {
      value: "canada",
      label: "Canada",
    },
  ];

  return (
    <div
      style={{
        padding: "40px",
      }}
    >
      <h2>Selected: {country?.label || "None"}</h2>

      <Dropdown
        options={countries}
        value={country}
        onChange={setCountry}
        placeholder="Select Country"
      />
    </div>
  );
}
