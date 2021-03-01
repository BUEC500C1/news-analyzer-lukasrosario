import React from 'react';

const Modal = ({ children, show }) => {
  return (
    <div
      className={`w-full h-full absolute flex items-center justify-center ${
        show ? 'flex' : 'hidden'
      }`}
    >
      <div className="w-full h-full absolute bg-black opacity-30 flex items-center justify-center" />
      <div className="flex px-36 py-16 z-10 bg-gray-800 rounded-md">
        {children}
      </div>
    </div>
  );
};

export default Modal;
