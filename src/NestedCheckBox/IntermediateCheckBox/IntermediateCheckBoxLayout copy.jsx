import React, { useState } from "react";

const checkBoxData = [
  {
    id: 1,
    label: "Frontend",
    children: [
      {
        id: 2,
        label: "React",
      },
      {
        id: 3,
        label: "Angular",
      },
      {
        id: 4,
        label: "Vue",
      },
    ],
  },
  {
    id: 5,
    label: "Backend",
    children: [
      {
        id: 6,
        label: "Node.js",
      },
      {
        id: 7,
        label: "Java",
        children: [{ id: 8, label: "Angular" }],
      },
    ],
  },
];

// ☑ Checked
// ☐ Unchecked
// ◩ Indeterminate (partially checked)
const addKeyToData = (data = []) => {
  return data.map((item) => {
    return {
      ...item,
      isChecked: false,
      statusKey: "Unchecked",
      children: item?.children?.length > 0 ? addKeyToData(item.children) : [],
    };
  });
};

//isEveryChildChecked
const isEveryChildChecked = (data) => data.every((i) => i.isChecked);

//updateState
const updateState = (ischecked, id, data, isFromChild = false) => {
  return data.map((item) => {
    return item.id === id || isFromChild
      ? {
          ...item,
          isChecked: ischecked,
          children:
            item.children?.length > 0
              ? updateState(ischecked, id, item.children, true)
              : [],
        }
      : {
          ...item,
          isChecked:
            item.children?.length > 0
              ? isEveryChildChecked(updateState(ischecked, id, item.children))
              : item.isChecked,
          children: updateState(ischecked, id, item.children),
        };
  });
};

// const updateState = (isChecked, id, data = [], isFromChild = false) => {
//   return data.map((item) => {
//     if (item.id === id || isFromChild) {
//       return {
//         ...item,
//         isChecked,
//         children:
//           item.children?.length > 0
//             ? updateState(isChecked, id, item.children, true)
//             : [],
//       };
//     }

//     const updatedChildren =
//       item.children?.length > 0
//         ? updateState(isChecked, id, item.children)
//         : [];

//     return {
//       ...item,
//       isChecked:
//         updatedChildren.length > 0
//           ? isEveryChildChecked(updatedChildren)
//           : item.isChecked,
//       children: updatedChildren,
//     };
//   });
// };

const IntermediateCheckBoxLayout = () => {
  const [checkdata, setCheckdata] = useState(addKeyToData(checkBoxData));
  const [checkedState, setCheckedState] = useState({});

  const handleCheck = (e, id) => {
    const isChecked = e.target.checked;
    const updatedState = updateState(isChecked, id, checkdata);
    setCheckdata(updatedState);
  };

  console.log(checkdata);

  return (
    <div>
      <RenderCheckBox
        data={checkdata}
        checkedState={checkedState}
        handleCheck={handleCheck}
      />
    </div>
  );
};

export default IntermediateCheckBoxLayout;

const RenderCheckBox = ({
  data = [],
  checkedState = {},
  handleCheck = () => {},
}) => {
  return (
    <div className="wrapper">
      {data.map((chekBoxdata) => {
        const {
          children = [],
          id = "",
          label = "",
          isChecked = false,
        } = chekBoxdata ?? {};
        return (
          <div className="wrapper" key={chekBoxdata.id}>
            <div>
              <input
                onChange={(e) => handleCheck(e, id)}
                checked={isChecked}
                id={id}
                type="checkbox"
              />
              <label htmlFor={id}>{chekBoxdata.label}</label>
            </div>

            {children.length > 0 && (
              <div className="pl-4">
                <RenderCheckBox
                  data={children}
                  checkedState={checkedState}
                  handleCheck={handleCheck}
                />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};
