import React from 'react';
import Navbar from './Navbar';

const Layout = ({ children, show }) => {
  return (
    <div
      className={`bg-gray-800 w-full flex flex-col min-h-screen items-center justify-start ${
        show ? 'overflow-hidden' : 'overflow-y-auto'
      }`}
    >
      <Navbar />
      <div className="w-full flex flex-col h-full min-h-screen justify-start relative">
        {children}
      </div>
    </div>
  );
};

export default Layout;
