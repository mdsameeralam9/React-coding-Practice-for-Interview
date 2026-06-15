import { memo, useState } from "react";

const Option = ({ option = {}, onSelect = () => {}, selectedOption="", isActive=false }) => {
  const [hoverCurrent, setHoverCurrent] = useState("");


  const isSelected =  selectedOption === option.value;
  const isHoverCurrent = hoverCurrent === option.value;


  return (
    <li
      className={`cursor-pointer p-2 ${isSelected && "bg-gray-500"} ${isHoverCurrent && "bg-gray-100"} border ${isActive && "border-amber-300"}`}
      onClick={() => onSelect(option.value)}
      onMouseOver={() => setHoverCurrent(option.value)}
      onMouseLeave={() => setHoverCurrent('')}
    >
      {option.label}
    </li>
  );
};

export default memo(Option);
