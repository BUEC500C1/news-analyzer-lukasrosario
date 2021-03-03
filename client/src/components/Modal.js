import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimesCircle } from '@fortawesome/free-regular-svg-icons';

const Modal = ({ children, show, setShow }) => {
  const hide = () => {
    setShow(false);
  };

  return (
    <div
      className={`w-full h-full absolute flex items-center justify-center ${
        show ? 'flex' : 'hidden'
      }`}
    >
      <div className="w-full h-full absolute bg-black opacity-30 flex items-center justify-center" />
      <div className="flex relative px-36 py-16 z-10 bg-gray-800 rounded-md">
        <button onClick={hide}>
          <FontAwesomeIcon
            className="absolute top-4 right-4 text-2xl text-red-500 cursor-pointer"
            icon={faTimesCircle}
          />
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
