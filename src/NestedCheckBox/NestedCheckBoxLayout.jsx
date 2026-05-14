import { useState } from "react";
import CheckBoxInput from "./CheckBoxInput";

const CheckboxesData = [
  {
    id: 1,
    label: "Fruits",
    children: [
      { id: 2, label: "Apple" },
      { id: 3, label: "Banana" },
      {
        id: 4,
        label: "Citrus",
        children: [
          { id: 5, label: "Orange" },
          { id: 6, label: "Lemon" },
        ],
      },
    ],
  },
  {
    id: 7,
    label: "Vegetables",
    children: [
      { id: 8, label: "Carrot" },
      { id: 9, label: "Broccoli" },
    ],
  },
];

const updateNewState = (
  isChecked = false,
  inputId,
  state = [],
  childCheck = false,
) => {
  return state.map((item) => {
    // If current item is selected OR parent triggered child update
    if (item.id === inputId || childCheck) {
      return {
        ...item,
        isChecked,
        children: updateNewState(
          isChecked,
          inputId,
          item?.children || [],
          true
        ),
      };
    }

    // Handle nested children
    if (item?.children?.length > 0) {
      const updatedChildren = updateNewState(
        isChecked,
        inputId,
        item.children
      );

      // Check if ALL children are checked
      const allChildrenChecked = updatedChildren.every(
        (child) => child.isChecked
      );

      return {
        ...item,
        isChecked: allChildrenChecked,
        children: updatedChildren,
      };
    }

    return item;
  });
};

const NestedCheckBoxLayout = () => {
  const [state, setState] = useState([...CheckboxesData]);

  const handleChange = (e, inputId) => {
    
    const updatedCheckBox = updateNewState(e.target.checked, inputId, state);
    console.log(updatedCheckBox);
    setState(updatedCheckBox)
  };

  return (
    <div>
      <h1>Nested Checkbox</h1>

      <CheckBoxInput state={state} handleChange={handleChange} />
    </div>
  );
};

export default NestedCheckBoxLayout;
