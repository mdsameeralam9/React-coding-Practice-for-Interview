import React, { useMemo, useState } from "react";

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
  const [dropDownOptions, setDropDownOptions] = useState(
    structuredClone(fruits),
  );
  const [selected, setSelected] = useState([]);
  const [selectedId, setSelectedId] = useState([]);
  const [inputvalue, setInputvalue] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  const selectItem = (id) => {
    const selectedItem = fruits.find((i) => i.id === id);
    setSelectedId((s) => [...s, id]);
    setSelected((s) => [...s, selectedItem]);
    setIsFocused(false);
  };

  const deleteItem = (id) => {
    const selectedItem = selected.filter((i) => i.id !== id);
    setSelected(selectedItem);
    setSelectedId((p) => p.filter((i) => i !== id));
  };

  const handleChnage = (e) => {
    let val = e.target.value;
    val = val.toLowerCase();
    setInputvalue(val);
  };

  console.log(selectedId, selected);

  const filteredList = useMemo(() => {
    let copyData = fruits.slice();

    // seletced
    if (selectedId?.length > 0) {
      copyData = copyData.slice(0).filter((i) => {
        if (!selectedId?.includes(i.id)) {
          return true;
        }
      });
    }

    // inputvalue
    if (inputvalue) {
      copyData = copyData.filter((i) =>
        i.name.toLowerCase().includes(inputvalue),
      );
    }

    return copyData;
  }, [dropDownOptions, inputvalue, selectedId, selected]);

  return (
    <div className="flex flex-col gap-2 w-full h-screen justify-center items-center">
      <h1>Seachable Dropdown Layout</h1>
      <div className="wrapper w-100 p-4">
        <div className="selected flex flex-wrap gap-1">
          {selected.map((itm) => (
            <p className="item bg-red-100 border" key={itm.id}>
              {itm.name}

              <span
                className="bg-red-500 text-white cursor-pointer"
                onClick={() => deleteItem(itm.id)}
              >
                X
              </span>
            </p>
          ))}
        </div>

        <input
          className="border w-100 my-2"
          value={inputvalue}
          type="search"
          onChange={handleChnage}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />

        <div className="dropdown flex flex-col gap-1 h-80 overflow-auto w-100">
          {isFocused &&
            filteredList?.map((itm) => (
              <p
                className="item bg-amber-100 border cursor-pointer"
                // onClick={() => selectItem(itm.id)}
                onMouseDown={() => selectItem(itm.id)}
                key={itm.id}
              >
                {itm.name}
              </p>
            ))}
        </div>
      </div>
    </div>
  );
};

export default SeachableDropdownLayout;
