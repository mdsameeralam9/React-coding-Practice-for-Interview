import { useState, useEffect, useRef, useCallback } from "react";
import Option from "./Option";

const Dropdown = ({
  label = "Select Option",
  renderOption = [],
  selectedOption = "",
  setSelectedOption = () => {},
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const wrapperRef = useRef(null);
  const showOption = () => {
    setIsOpen((i) => !i);
  };

  // need to attach event listner to window object when mount so can use
  // that to close options when click outside
  useEffect(() => {
    const closeOption = (event) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setIsOpen(false);
        console.log(event);
      }
    };
    document.addEventListener("mousedown", closeOption);

    return () => document.removeEventListener("mousedown", closeOption);
  }, []);

  // handleSelect
  const handleSelect = useCallback((val) => {
    setSelectedOption(val);
    setIsOpen(false);
  }, []);

  const handleKeyDown = (e) => {
    const actionKey = e.key ?? e.code;
    switch (actionKey) {
      case "Enter": {
        () => handleSelect(renderOption[activeIndex]?.value);
        break;
      }

      case "ArrowUp": {
        setActiveIndex((a) => a - 1);
        break;
      }

      case "ArrowDown": {
        setActiveIndex((a) => a + 1);
        break;
      }
    }
  };

  console.log(activeIndex);

  return (
    <div className="flex flex-col gap-0.5 w-80 m-5" ref={wrapperRef}>
      <h1>{selectedOption}</h1>
      <button
        onClick={showOption}
        onKeyDown={handleKeyDown}
        className="wrapper border cursor-pointer w-full bg-blue-900 text-white text-center py-2"
      >
        {label}
      </button>
      {isOpen && (
        <ul
          role="select"
          className="w-full rounded border border-gray-300 h-60 overflow-auto flex flex-col gap-1"
        >
          {renderOption.map((val, index) => (
            <Option
              option={val}
              key={index}
              onSelect={handleSelect}
              selectedOption={selectedOption}
              isActive={index === activeIndex}
            />
          ))}
        </ul>
      )}
    </div>
  );
};

export default Dropdown;
