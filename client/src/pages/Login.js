import React, { useState } from 'react';

const Login = () => {
  const [inputs, setInputs] = useState({ email: '', password: '' });

  const handleChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  return (
    <div className="bg-gray-800 w-full flex flex-col min-h-screen items-center justify-center space-y-12">
      <p className="text-5xl text-white">Welcome back!</p>
      <input
        name="email"
        type="email"
        placeholder="Email"
        className="w-72 py-2 text-xl border-2 border-green-300 rounded-md bg-gray-700 text-white pl-2"
        value={inputs.email}
        onChange={handleChange}
      />
      <input
        name="password"
        type="password"
        placeholder="Password"
        className="w-72 py-2 text-xl border-2 border-green-300 rounded-md bg-gray-700 text-white pl-2"
        value={inputs.password}
        onChange={handleChange}
      />
      <button class="bg-green-500 px-8 py-2 rounded-md text-xl text-white hover:bg-green-400">
        Log in
      </button>
      <p className="text-md text-white inline">
        New user?{' '}
        <a href="/signup" className="inline text-md text-green-500">
          Sign up here.
        </a>
      </p>
    </div>
  );
};

export default Login;
