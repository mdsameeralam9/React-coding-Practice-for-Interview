import React from "react";

const reducer = (state, action) => {
  switch (action.type) {
    case "INC":
      return {
        ...state,
        countValue: state.countValue + 1,
      };

    case "DEC":
      return {
        ...state,
        countValue: state.countValue - 1,
      };

    default:
      return state;
  }
};

const UseReducerHookLayout = () => {
  const [count, disPatch] = React.useReducer(reducer, { countValue: 0 });
  return (
    <div>
      <h1>UseReducerHookLayout : {count.countValue} </h1>
      <button
        onClick={() => {
          disPatch({ type: "INC" });
        }}
      >
        Increment +
      </button>
      <button
        onClick={() => {
          disPatch({ type: "DEC" });
        }}
      >
        Decrement -
      </button>
    </div>
  );
};

export default UseReducerHookLayout;
