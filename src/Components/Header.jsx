import React from 'react';
import { useSelector } from 'react-redux';

function Header({ toggle, setToggle, darkMode, setDarkMode }) {

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  return (
    <header className={`flex-wrap py-2 bg-white shadow-lg sticky top-0 z-50 flex items-center justify-between sm:p-3 md:tracking-widest dark:bg-secondary`}>

      <div className='dark:bg-[#ffffff4f] my-2 sm:py-3 h-10 sm:h-fit w-full sm:w-fit flex sm:gap-2 items-center justify-between mx-2 sm:justify-center rounded sm:px-2'>
        <img
          src='/img/logo.png'
          className='dark:brightness-0 drop-shadow-md h-full sm:w-full' alt="" />
        <label className="hamburger">
          <input
            type="checkbox"
            checked={toggle}
            onChange={() => { setToggle(!toggle) }}
          />
          <svg viewBox="0 0 32 32">
            <path className="line dark:stroke-neutral-300 stroke-black line-top-bottom" d="M27 10 13 10C10.8 10 9 8.2 9 6 9 3.5 10.8 2 13 2 15.2 2 17 3.8 17 6L17 26C17 28.2 18.8 30 21 30 23.2 30 25 28.2 25 26 25 23.8 23.2 22 21 22L7 22"></path>
            <path className="line dark:stroke-neutral-300 stroke-black" d="M7 16 27 16"></path>
          </svg>
        </label>
      </div>

      <div className='flex justify-between mx-2 ml-5 sm:justify-end sm:w-fit w-full items-center'>
        <div className='flex gap-4 sm:px-2 sm:m-4 items-center'>
          <div className=" sm:h-10 sm:w-10 w-8 h-8 rounded-md overflow-hidden">
            <img src="/img/user.jpeg" className='h-full w-full scale-125' alt="" />
          </div>
          <div>
            <h3 className='dark:text-neutral-300 text-sm sm:text-base font-semibold sm:block hidden'>{userInfo ? userInfo.name : "John Doe"}</h3>
            <p className='text-[10px] sm:text-sm text-neutral-500 dark:text-neutral-400 sm:block hidden'>{userInfo && userInfo.isAdmin ? "Admin" : null}</p>
          </div>
        </div>
        <div className="toggle-container">
          <input type="checkbox" checked={darkMode} onChange={() => {setDarkMode(!darkMode); localStorage.setItem('darkMode', !darkMode) }} className="toggle-input" />
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 292 142" className="toggle">
            <path d="M71 142C31.7878 142 0 110.212 0 71C0 31.7878 31.7878 0 71 0C110.212 0 119 30 146 30C173 30 182 0 221 0C260 0 292 31.7878 292 71C292 110.212 260.212 142 221 142C181.788 142 173 112 146 112C119 112 110.212 142 71 142Z" className="toggle-background"></path>
            <rect rx="6" height="64" width="12" y="39" x="64" className="toggle-icon on"></rect>
            <path d="M221 91C232.046 91 241 82.0457 241 71C241 59.9543 232.046 51 221 51C209.954 51 201 59.9543 201 71C201 82.0457 209.954 91 221 91ZM221 103C238.673 103 253 88.6731 253 71C253 53.3269 238.673 39 221 39C203.327 39 189 53.3269 189 71C189 88.6731 203.327 103 221 103Z" fillRule="evenodd" className="toggle-icon off"></path>
            <g filter="url('#goo')">
              <rect fill="#fff" rx="29" height="58" width="116" y="42" x="13" className="toggle-circle-center"></rect>
              <rect fill="#fff" rx="58" height="114" width="114" y="14" x="14" className="toggle-circle left"></rect>
              <rect fill="#fff" rx="58" height="114" width="114" y="14" x="164" className="toggle-circle right"></rect>
            </g>
            <filter id="goo">
              <feGaussianBlur stdDeviation="10" result="blur" in="SourceGraphic"></feGaussianBlur>
              <feColorMatrix result="goo" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7" mode="matrix" in="blur"></feColorMatrix>
            </filter>
          </svg>
        </div>
      </div>
    </header>
  );
};

export default Header;