import React from "react";
import { createPortal } from "react-dom";

const Modal = ({ isOpen = false, action = () => {} }) => {
  if (!isOpen) return null;

  const ELemnet = (
    <div className="fixed inset-0 z-40 bg-black/40 flex items-center justify-center">
      <div className="bg-white border w-1/2 h-1/2 rounded-2xl flex flex-col gap-4 items-center justify-center">
        <h1 className="text-2xl font-bold">Confirm Action</h1>

        <p>Are you sure you want to proceed?</p>

        <div className="flex gap-3 justify-center items-center">
          <button
            className="bg-green-700 text-white cursor-pointer py-2 px-5 rounded"
            type="button"
            onClick={() => action("confirm")}
          >
            Confirm
          </button>

          <button
            className="bg-red-700 text-white cursor-pointer py-2 px-5 rounded"
            type="button"
            onClick={() => action("cancel")}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );

  return createPortal(ELemnet, document.getElementById("modalRoot"));
};

export default Modal;
