import React, { useState } from 'react';
import { logout } from '../util/auth';
import useRouter from '../util/router';

const Navbar = () => {
  const [search, setSearch] = useState('');

  const router = useRouter();

  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  const handleSubmit = () => {
    if (search.length < 3) {
      alert('Please enter a longer search (>= 3 characters)');
      return;
    }
    router.push(`/search/${search}`);
  };

  return (
    <div className="w-full flex flex-row items-center justify-between border-b-2 border-green-500 bg-gray-800 px-16 py-6">
      <a href="/" className="text-white text-3xl">
        News Analyzer
      </a>
      <form className="w-1/2 flex flex-row" onSubmit={handleSubmit}>
        <input
          className="w-full py-2 pl-2 rounded-l-md overflow-x auto flex flex-col border-2 border-r-0 border-green-500 text-white bg-gray-800"
          placeholder="Search"
          value={search}
          onChange={handleChange}
        />
        <button
          type="submit"
          className="bg-green-500 px-8 py-2 rounded-r-md text-white hover:bg-green-400"
        >
          Go
        </button>
      </form>
      <button
        onClick={logout}
        className="bg-green-500 px-8 py-2 rounded-md text-xl text-white hover:bg-green-400"
      >
        Log Out
      </button>
    </div>
  );
};

export default Navbar;
