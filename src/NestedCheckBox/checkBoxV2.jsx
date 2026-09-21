import React, { useState, useCallback } from 'react';
import './style.css';

const checkboxConfig = [
  {
    id: 1,
    label: 'Frontend',
    checked: false,
    children: [
      {
        id: 2,
        label: 'React',
        checked: false,
      },
      {
        id: 3,
        label: 'JavaScript',
        checked: false,
      },
      {
        id: 4,
        label: 'CSS',
        checked: false,
        children: [
          {
            id: 5,
            label: 'Flexbox',
            checked: false,
          },
          {
            id: 6,
            label: 'Grid',
            checked: false,
          },
        ],
      },
    ],
  },
  {
    id: 7,
    label: 'Backend',
    checked: false,
    children: [
      {
        id: 8,
        label: 'Node.js',
        checked: false,
      },
      {
        id: 9,
        label: 'Express.js',
        checked: false,
      },
    ],
  },
];

const updatedStated = (data, { isChecked, id }, currentState) => {
  const state = { ...currentState };

  // --------------------------------
  // 1. Update clicked item + children
  // --------------------------------
  const updateChildren = (items, targetId) => {
    items.forEach((item) => {
      if (item.id === targetId) {
        state[item.id] = isChecked;

        // Update all descendants
        if (item.children?.length > 0) {
          updateAllChildren(item.children);
        }

        return;
      }

      if (item.children?.length > 0) {
        updateChildren(item.children, targetId);
      }
    });
  };

  const updateAllChildren = (items) => {
    items.forEach((item) => {
      state[item.id] = isChecked;

      if (item.children?.length > 0) {
        updateAllChildren(item.children);
      }
    });
  };

  updateChildren(data, id);

  // --------------------------------
  // 2. Calculate all parent states
  // --------------------------------
  const updateParents = (items) => {
    items.forEach((item) => {
      if (item.children?.length > 0) {
        // First calculate nested parents
        updateParents(item.children);

        // Parent is checked only when
        // every child is checked
        state[item.id] = item.children.every(
          (child) => state[child.id] === true
        );
      }
    });
  };

  updateParents(data);

  return state;
};

export default function App() {
  const [checkedState, setCheckedState] = useState({});

  const handleChange = useCallback((e, id) => {
    const isChecked = e.target.checked;

    setCheckedState((currentState) => {
      return updatedStated(
        checkboxConfig,
        {
          isChecked,
          id,
        },
        currentState
      );
    });
  }, []);

  return (
    <div>
      <h1>Nested Checkbox</h1>

      <CheckBox
        checkBoxData={checkboxConfig}
        checkedState={checkedState}
        handleChange={handleChange}
      />
    </div>
  );
}

const CheckBox = ({
  checkBoxData = [],
  checkedState = {},
  handleChange = () => {},
}) => {
  return (
    <div>
      {checkBoxData.map((elem) => (
        <div key={elem.id}>
          <Input
            inputState={elem}
            checkedState={checkedState}
            handleChange={(e) => handleChange(e, elem.id)}
          />

          {elem.children?.length > 0 && (
            <div style={{ paddingLeft: '1rem' }}>
              <CheckBox
                checkBoxData={elem.children}
                checkedState={checkedState}
                handleChange={handleChange}
              />
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

const Input = ({ inputState = {}, checkedState = {}, handleChange }) => {
  return (
    <div>
      <input
        id={inputState.id}
        type="checkbox"
        checked={checkedState[inputState.id] ?? false}
        onChange={handleChange}
      />

      <label htmlFor={inputState.id}>{inputState.label}</label>
    </div>
  );
};
