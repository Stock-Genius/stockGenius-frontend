import React from 'react';
import Footer from './Footer';
import { useSelector } from 'react-redux';


function Sidebar({ onItemClick, selectedItem, toggle }) {

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  return (
    <div className=' fixed sm:sticky top-[105px] bottom-0 h-[85vh] left-0 sm:h-[82.8vh] z-40'>
      <aside className={`overflow-y-auto pb-20 sm:w-[12em] w-[9em] h-full flex flex-col justify-between items-between z-40 bg-secondary text-neutral-200 ${toggle ? '-ml-0' : '-ml-52'}`} style={{ scrollbarWidth: 'thin' }}>
      <ul>
        {userInfo && userInfo.isAdmin && (
          <li
            onClick={() => { onItemClick('Inventory') }}
            className={`flex items-center overflow-hidden h-[5.6em] sm:h-[6em] mx-4 sm:mx-8 mt-4 p-3 sm:p-4 rounded-md after:top-0 flex-col after:-z-10 cursor-pointer relative after:transition-all hover:after:top-0 after:h-full after:w-full after:content-[""] after:bg-primary after:absolute transiiton-all z-20 bg-third ${selectedItem === 'Admin' ? 'after:top-0' : 'after:top-full'
              }`}>
            <i className="fa-solid fa-user-tie text-3xl sm:text-3xl mb-1"></i>
            Admin
          </li>

        )}
        <li
          onClick={() => { onItemClick('Inventory') }}
          className={`flex items-center overflow-hidden h-[5.6em] sm:h-[6em] mx-4 sm:mx-8 mt-4 p-3 sm:p-4 rounded-md after:top-0 flex-col after:-z-10 cursor-pointer relative after:transition-all hover:after:top-0 after:h-full after:w-full after:content-[""] after:bg-primary after:absolute transiiton-all z-20 bg-third ${selectedItem === 'Inventory' ? 'after:top-0' : 'after:top-full'
            }`}>
          <i className="fas fa-list text-3xl sm:text-3xl mb-1"></i>
          Inventory
        </li>
        <li
          onClick={() => { onItemClick('Transactions') }}
          className={`flex items-center overflow-hidden h-[5.6em] sm:h-[6em] mx-4 sm:mx-8 mt-4 p-3.5 sm:p-4 rounded-md after:top-0 flex-col after:-z-10 cursor-pointer relative after:transition-all hover:after:top-0 after:h-full after:w-full after:content-[""] after:bg-primary after:absolute transiiton-all z-20 bg-third ${selectedItem === 'Transactions' ? 'after:top-0' : 'after:top-full'
            }`}>
          <i className="text-3xl sm:text-3xl mb-1 fa-regular fa-file-lines"></i>
          Transactions
        </li>
        <li
          onClick={() => { onItemClick('My Profile') }}
          className={`flex items-center overflow-hidden h-[5.6em] sm:h-[6em] mx-4 sm:mx-8 mt-4 p-3 sm:p-4 rounded-md after:top-0 flex-col after:-z-10 cursor-pointer relative after:transition-all hover:after:top-0 after:h-full after:w-full after:content-[""] after:bg-primary after:absolute transiiton-all z-20 bg-third ${selectedItem === 'My Profile' ? 'after:top-0' : 'after:top-full'
            }`}>
          <i className="fa-regular fa-user text-3xl sm:text-3xl mb-1"></i>
          My Profile
        </li>
      </ul>
      <div className='fixed bottom-0 border-green-400 py-2 sm:w-[12em] w-[9em] bg-secondary z-20'>
        <Footer />
      </div>
    </aside>
    </div >
  );
}

export default Sidebar;
