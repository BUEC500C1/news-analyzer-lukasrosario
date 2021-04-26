import React, { useState } from 'react';
import useRouter from '../util/router';
import { apiLogin } from '../util/auth';

const Login = () => {
  const [inputs, setInputs] = useState({ email: '', password: '' });

  const router = useRouter();

  const handleChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const goSignup = () => {
    router.push('/');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (await apiLogin(inputs)) {
      console.log('success');
    } else {
      console.log('nah');
    }
  };

  return (
    <div className="bg-gray-800 w-full flex flex-col min-h-screen items-center justify-center space-y-12">
      <p className="text-5xl text-white">Welcome back!</p>
      <form
        onSubmit={handleSubmit}
        className="w-full flex flex-col items-center justify-center space-y-12"
      >
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
        <button
          type="submit"
          className="bg-green-500 px-8 py-2 rounded-md text-xl text-white hover:bg-green-400"
        >
          Log in
        </button>
      </form>
      <p className="text-md text-white inline">
        New user?{' '}
        <button onClick={goSignup} className="inline text-md text-green-500">
          Sign up here.
        </button>
      </p>
    </div>
  );
};

export default Login;
