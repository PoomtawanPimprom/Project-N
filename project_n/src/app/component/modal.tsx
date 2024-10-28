import React from "react";

interface prop {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Modal = (prop: prop) => {
  return (
    <div
      onClick={prop.onClose}
      className={`fixed inset-0 flex justify-center items-center transition-colors ${
        prop.open ? "visible bg-black/20" : " invisible"
      }`}
    >
      Modal
      <div
        onClick={(e) => e.stopPropagation()}
        className={`bg-white rounded-xl shadow p-6 transition-all ${
          prop.open ? " scale-100 opacity-100" : " scale-125 opacity-0"
        }`}
      >
        <button 
        onClick={prop.onClose}
        className=" absolute top-2 right-2 p-1 rounded-lg text-gray-400 bg-white hover:bg-gray-50 hover:text-gray-600"> </button>   
        {prop.children}
      </div>
    </div>
  );
};

export default Modal;
