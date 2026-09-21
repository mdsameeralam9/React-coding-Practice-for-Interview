import React, { useState } from "react";
import { useDataContext } from "../context/DataProvider";

const FormLayout = () => {
  const {
    open = false,
    onClose = () => {},
    onOpen = () => {}
  } = useDataContext();

  console.log(useDataContext());

  return (
    <div className="WrapperForm">
      {!open && (
        <button
          onClick={onOpen}
          type="button"
          className="cursor-pointer bg-blue-800 text-white py-1 px-10 rounded"
        >
          Add Item
        </button>
      )}
      {open && (
        <Modal onClose={onClose} isOpen={open}>
          <Form />
        </Modal>
      )}
    </div>
  );
};

export default FormLayout;

// Form
const Form = () => {
  const {
    addTodo = () => {},
    onClose = () => {},
  } = useDataContext();


  const [formState, setFormState] = useState({});

  const [optionsData] = useState([
    { id: 1, label: "Open", value: "open" },
    { id: 2, label: "InProgress", value: "inProgress" },
    { id: 3, label: "Completed", value: "completed" },
  ]);

  const addTodoS = (e) => {
    e.preventDefault();
    addTodo(formState)
    onClose()
  };

  const handleChnage = (e) => {
    const { value, name } = e.target;
    setFormState(p => ({...p, [name]: value}))
  };

  return (
    <div className="formStyle border rounded flex flex-col gap-1 justify-center items-center">
      <h1>Add Todo Item</h1>
      <form onSubmit={addTodoS} className="flex flex-col gap-2 p-2">
        <input
          type="text"
          name="task"
          value={formState["task"]}
          onChange={handleChnage}
          placeholder="task to add"
          className="border p-1"
        />

        <select className="border p-1" onChange={handleChnage} name="status">
          {optionsData.map((item) => (
            <option key={item.id} value={item.value} defaultValue="open">
              {item.label}
            </option>
          ))}
        </select>

        <button
          className="cursor-pointer bg-blue-800 text-white py-1 px-10 rounded"
          type="submit "
        >
          Submit
        </button>
      </form>
    </div>
  );
};

// Modal
const Modal = ({ children, onClose = () => {}, isOpen = false }) => {
  if (!isOpen) return null;
  const handleClikOutside = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };
  return (
    <div
      onClick={handleClikOutside}
      className="modalWrapper w-full h-full bg-gray-100 flex items-center justify-center absolute"
    >
      <div className="contentWrapper bg-white shadow-2xl fixed p-4">
        <div className="close mb-2 flex justify-end">
          <button
            className="border px-3 text-red-600 cursor-pointer"
            onClick={onClose}
          >
            X
          </button>
        </div>
        {children}
      </div>
    </div>
  );
};
