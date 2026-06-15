import React, { useState } from "react";
import Dropdown from "./Dropdown";

export default function DropdownLayout() {
  const [selectedOption, setSelectedOption] = useState(null);

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
    <Dropdown
      renderOption={countries}
      selectedOption={selectedOption}
      setSelectedOption={setSelectedOption}
    />
  );
}
