import React from 'react';
import { useSelector } from 'react-redux';

function Header({ toggle, setToggle }) {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  // #28427B  .  #4C7DAE   #00706A
  return (
    <header className='bg-primary shadow-lg sticky top-0 z-50 flex items-center md:justify-center transition-all duration-100 px-3 md:p-2 md:tracking-widest'>
      <div className='w-24 h-20 lg:h-24 p-3 flex items-center justify-center rounded px-4'>
        <img src="/img/logo.png" className='drop-shadow-md h-full w-full' alt="" />
      </div>
      <div className='flex justify-end w-full'>
          <h2 className='text-white heading font-bold md:px-2 text-2xl hidden md:block  capitalize'>{userInfo ? userInfo.shopname : 'Inventory Management Tool'}</h2>

        {userInfo ? (
          <label className="hamburger md:hidden">
            <input
              type="checkbox"
              checked={toggle}
              onChange={() => { setToggle(!toggle) }}
            />
            <svg viewBox="0 0 32 32">
              <path className="line line-top-bottom" d="M27 10 13 10C10.8 10 9 8.2 9 6 9 3.5 10.8 2 13 2 15.2 2 17 3.8 17 6L17 26C17 28.2 18.8 30 21 30 23.2 30 25 28.2 25 26 25 23.8 23.2 22 21 22L7 22"></path>
              <path className="line" d="M7 16 27 16"></path>
            </svg>
          </label>
        ) : ""}
      </div>
    </header>
  );
};

export default Header;
