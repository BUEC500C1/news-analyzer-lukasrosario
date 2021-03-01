import React, { useState } from 'react';
import Modal from './Modal';

const SignupModal = ({ show }) => {
  const [inputs, setInputs] = useState({ email: '', password: '' });

  const handleChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  return (
    <Modal show={show}>
      <div className="w-full h-full flex flex-col">
        <input
          name="email"
          type="email"
          placeholder="Email"
          className="w-72 py-2 text-xl border-2 border-green-300 rounded-md bg-gray-700 text-white pl-2 mb-6"
          value={inputs.email}
          onChange={handleChange}
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          className="w-72 py-2 text-xl border-2 border-green-300 rounded-md bg-gray-700 text-white pl-2 mb-12"
          value={inputs.password}
          onChange={handleChange}
        />
        <button class="bg-green-500 px-8 py-2 rounded-md text-xl text-white hover:bg-green-400">
          Sign Up
        </button>
      </div>
    </Modal>
  );
};

export default SignupModal;
