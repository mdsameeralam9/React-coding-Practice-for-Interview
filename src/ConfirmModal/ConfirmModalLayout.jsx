import { useState } from "react";
import Modal from "./Modal";

const ConfirmModalLayout = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [actionType, setActionType] = useState("");

  const action = (type = "") => {
    if (!type) return;
    setActionType(type);
    setIsOpen(false)
  };

  return (
    <div className={`h-screen w-full flex-col gap-1 flex justify-center items-center ${isOpen ? "bg-gray-400" : "bg-white"}`}>
      <button
        onClick={() => setIsOpen((i) => !i)}
        className="bg-blue-700 text-white cursor-pointer py-2 px-5"
      >
        Open Confirmation Modal
      </button>
        <h3>{actionType}</h3>
      <Modal isOpen={isOpen} action={action} />
    
    </div>
  );
};

export default ConfirmModalLayout;
