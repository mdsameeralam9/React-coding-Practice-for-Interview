import React, { useState, useCallback, useEffect, useRef } from 'react';
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

  // Update clicked checkbox and all its children
  const updateChildren = (items, targetId) => {
    items.forEach((item) => {
      if (item.id === targetId) {
        state[item.id] = {
          checked: isChecked,
          indeterminate: false,
        };

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

  // Update all descendants
  const updateAllChildren = (items) => {
    items.forEach((item) => {
      state[item.id] = {
        checked: isChecked,
        indeterminate: false,
      };

      if (item.children?.length > 0) {
        updateAllChildren(item.children);
      }
    });
  };

  updateChildren(data, id);

  // Calculate parent states from bottom to top
  const updateParents = (items) => {
    items.forEach((item) => {
      if (item.children?.length > 0) {
        // First calculate nested parents
        updateParents(item.children);

        const children = item.children;

        const checkedCount = children.filter(
          (child) => state[child.id]?.checked === true
        ).length;

        const indeterminateCount = children.filter(
          (child) => state[child.id]?.indeterminate === true
        ).length;

        const allChecked = checkedCount === children.length;

        const partiallyChecked = checkedCount > 0 || indeterminateCount > 0;

        state[item.id] = {
          checked: allChecked,
          indeterminate: !allChecked && partiallyChecked,
        };
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

    setCheckedState((currentState) =>
      updatedStated(
        checkboxConfig,
        {
          isChecked,
          id,
        },
        currentState
      )
    );
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
  const checkboxRef = useRef(null);

  const checked = checkedState[inputState.id]?.checked ?? false;

  const indeterminate = checkedState[inputState.id]?.indeterminate ?? false;

  useEffect(() => {
    if (checkboxRef.current) {
      checkboxRef.current.indeterminate = indeterminate;
    }
  }, [indeterminate]);

  return (
    <div>
      <input
        ref={checkboxRef}
        id={inputState.id}
        type="checkbox"
        checked={checked}
        onChange={handleChange}
      />

      <label htmlFor={inputState.id}>{inputState.label}</label>
    </div>
  );
};
