import React, { useState } from 'react';
import SignupModal from '../components/SignupModal';
import useRouter from '../util/router';

import news from '../img/news.jpg';

const Home = () => {
  const [show, setShow] = useState(false);

  const router = useRouter();

  const handleSignupClick = () => {
    setShow(true);
  };

  const goLogin = () => {
    router.push('/login');
  };

  return (
    <div className="w-full min-h-screen flex flex-row">
      <SignupModal show={show} setShow={setShow} />
      <div
        style={{ backgroundImage: `url(${news})` }}
        className="w-7/12 min-h-screen bg-cover bg-bottom"
      />
      <div className="w-5/12 px-12 h-full min-h-screen bg-gray-800 flex flex-col items-start justify-center space-y-8">
        <p className="text-4xl text-white">
          Join now to start analyzing the news.
        </p>
        <button
          onClick={handleSignupClick}
          class="w-36 bg-green-500 py-2 rounded-md text-xl text-white hover:bg-green-400"
        >
          Sign up
        </button>
        <button
          onClick={goLogin}
          class="w-36 border-2 border-green-500 py-2 rounded-md text-xl text-white hover:border-green-400"
        >
          Log in
        </button>
      </div>
    </div>
  );
};

export default Home;
