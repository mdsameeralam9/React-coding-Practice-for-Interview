import React, { useEffect, useMemo, useRef, useState } from "react";

const fruits = [
  { id: 1, name: "Apple" },
  { id: 2, name: "Banana" },
  { id: 3, name: "Mango" },
  { id: 4, name: "Orange" },
  { id: 5, name: "Grapes" },
  { id: 6, name: "Pineapple" },
  { id: 7, name: "Watermelon" },
  { id: 8, name: "Papaya" },
  { id: 9, name: "Guava" },
  { id: 10, name: "Pomegranate" },
  { id: 11, name: "Strawberry" },
  { id: 12, name: "Blueberry" },
  { id: 13, name: "Kiwi" },
  { id: 14, name: "Cherry" },
  { id: 15, name: "Peach" },
  { id: 16, name: "Pear" },
  { id: 17, name: "Lychee" },
  { id: 18, name: "Coconut" },
  { id: 19, name: "Dragon Fruit" },
  { id: 20, name: "Muskmelon" },
];

const SeachableDropdownLayout = () => {
  const wrapperRef = useRef(null);

  const [selected, setSelected] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  // close dropdown on outside click
  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setIsFocused(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  // selected ids set for fast lookup
  const selectedIds = useMemo(() => {
    return new Set(selected.map((item) => item.id));
  }, [selected]);

  const handleChange = (e) => {
    setInputValue(e.target.value.toLowerCase());
  };

  const selectItem = (item) => {
    setSelected((prev) => [...prev, item]);
    setInputValue("");
  };

  const deleteItem = (id) => {
    setSelected((prev) => prev.filter((item) => item.id !== id));
  };

  // filter list
  const filteredList = useMemo(() => {
    return fruits.filter((item) => {
      const isSelected = selectedIds.has(item.id);

      const isMatched = item.name.toLowerCase().includes(inputValue);

      return !isSelected && isMatched;
    });
  }, [inputValue, selectedIds]);

  return (
    <div className="flex items-center justify-center w-full h-screen">
      <div ref={wrapperRef} className="w-[400px] p-4 border rounded-md">
        <h1 className="mb-3 text-xl font-bold">Searchable Dropdown</h1>

        {/* Selected Items */}
        <div className="flex flex-wrap gap-2 mb-2">
          {selected.map((item) => (
            <div
              key={item.id}
              className="flex items-center gap-2 px-2 py-1 border rounded bg-red-100"
            >
              <span>{item.name}</span>

              <button
                className="px-1 text-white bg-red-500 rounded"
                onClick={() => deleteItem(item.id)}
              >
                X
              </button>
            </div>
          ))}
        </div>

        {/* Input */}
        <input
          type="search"
          value={inputValue}
          onChange={handleChange}
          onFocus={() => setIsFocused(true)}
          placeholder="Search fruits..."
          className="w-full p-2 border rounded"
        />

        {/* Dropdown */}
        {isFocused && filteredList.length > 0 && (
          <div className="mt-2 overflow-auto border rounded max-h-60">
            {filteredList.map((item) => (
              <div
                key={item.id}
                className="p-2 cursor-pointer hover:bg-amber-100"
                onClick={() => selectItem(item)}
              >
                {item.name}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SeachableDropdownLayout;
