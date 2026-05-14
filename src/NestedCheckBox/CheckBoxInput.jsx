import React from "react";

const CheckBoxInput = ({ state = [], handleChange = () => {} }) => {
  return (
    <div className="checkboxcontainer">
      {state.map((item) => (
        <div className="wrapper" key={item.id}>
          <div className="chekboxIte cursor-pointer">
            <input
              id={String(item.id)}
              type="checkbox"
              className="cursor-pointer"
              onChange={(e) => handleChange(e, item.id)}
              checked={item?.isChecked ?? false}
            />
            <label htmlFor={String(item.id)} className="cursor-pointer">
              {item.label}
            </label>
          </div>

          {item?.children?.length > 0 && (
            <div className="childItem pl-3">
              <CheckBoxInput
                state={item?.children}
                handleChange={handleChange}
              />
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default CheckBoxInput;
