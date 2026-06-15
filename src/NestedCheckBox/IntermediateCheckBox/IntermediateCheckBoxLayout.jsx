import React, { useEffect, useRef, useState } from "react";

const checkBoxData = [
  {
    id: 1,
    label: "Frontend",
    children: [
      { id: 2, label: "React" },
      { id: 3, label: "Angular" },
      { id: 4, label: "Vue" },
    ],
  },
  {
    id: 5,
    label: "Backend",
    children: [
      { id: 6, label: "Node.js" },
      {
        id: 7,
        label: "Java",
        children: [{ id: 8, label: "Spring Boot" }],
      },
    ],
  },
];

// Initialize tree
const addMeta = (data = []) => {
  return data.map((item) => ({
    ...item,
    isChecked: false,
    indeterminate: false,
    children: addMeta(item.children || []),
  }));
};

// Derive parent state from children
const getStatus = (children = []) => {
  const allChecked = children.every((child) => child.isChecked);

  const someChecked = children.some(
    (child) => child.isChecked || child.indeterminate,
  );

  return {
    isChecked: allChecked,
    indeterminate: !allChecked && someChecked,
  };
};

const updateState = (checked, targetId, data = [], forceUpdate = false) => {
  return data.map((item) => {
    const shouldUpdate = item.id === targetId || forceUpdate;

    // Parent clicked
    if (shouldUpdate) {
      const updatedChildren = updateState(
        checked,
        targetId,
        item.children || [],
        true,
      );

      return {
        ...item,
        isChecked: checked,
        indeterminate: false,
        children: updatedChildren,
      };
    }

    // Process children first
    const updatedChildren = updateState(checked, targetId, item.children || []);

    // Leaf node
    if (updatedChildren.length === 0) {
      return item;
    }

    const status = getStatus(updatedChildren);

    return {
      ...item,
      ...status,
      children: updatedChildren,
    };
  });
};

const Checkbox = ({ checked, indeterminate, onChange, id }) => {
  const ref = useRef(null);

  useEffect(() => {
    if (ref.current) {
      ref.current.indeterminate = indeterminate;
    }
  }, [indeterminate]);

  return (
    <input
      ref={ref}
      id={id}
      type="checkbox"
      checked={checked}
      onChange={onChange}
    />
  );
};

const RenderCheckBox = ({ data, handleCheck }) => {
  return (
    <>
      {data.map((item) => (
        <div key={item.id} style={{ marginLeft: "20px" }}>
          <Checkbox
            id={item.id}
            checked={item.isChecked}
            indeterminate={item.indeterminate}
            onChange={(e) => handleCheck(e, item.id)}
          />

          <label htmlFor={item.id}>{item.label}</label>

          {item.children?.length > 0 && (
            <RenderCheckBox data={item.children} handleCheck={handleCheck} />
          )}
        </div>
      ))}
    </>
  );
};

export default function IntermediateCheckBoxLayout() {
  const [data, setData] = useState(addMeta(checkBoxData));

  const handleCheck = (e, id) => {
    const checked = e.target.checked;

    setData((prev) => updateState(checked, id, prev));
  };

  return (
    <div>
      <h3>Nested Checkbox Tree</h3>

      <RenderCheckBox data={data} handleCheck={handleCheck} />
    </div>
  );
}
