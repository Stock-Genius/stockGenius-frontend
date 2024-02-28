import React from 'react';
import Footer from './Footer';


function Sidebar({ onItemClick, selectedItem, toggle, setToggle }) {

  return (
    <div className='fixed sm:sticky top-[105px] bottom-0 h-[85vh] left-0 sm:h-[82.8vh] z-40'>
      <aside className={`sm:w-[12em] w-[8em] h-full flex flex-col justify-between items-between z-40 bg-secondary text-neutral-200 ${toggle ? '-ml-0' : '-ml-52'}`}>
        <ul>
          <li
            onClick={() => { setToggle(!toggle); onItemClick('Inventory') }}
            className={`flex items-center overflow-hidden h-[5em] sm:h-[6em] mx-4 sm:mx-8 mt-4 p-3 sm:p-4 rounded-md after:top-0 flex-col after:-z-10 cursor-pointer relative after:transition-all hover:after:top-0 after:h-full after:w-full after:content-[""] after:bg-primary after:absolute transiiton-all z-20 bg-third ${selectedItem === 'Inventory' ? 'after:top-0' : 'after:top-full'
              }`}>
            <i className="fas fa-list text-xl sm:text-3xl mb-1"></i>
            Inventory
          </li>
          <li
            onClick={() => { setToggle(!toggle); onItemClick('Transactions') }}
            className={`flex items-center overflow-hidden h-[5em] sm:h-[6em] mx-4 sm:mx-8 mt-4 p-3 sm:p-4 rounded-md after:top-0 flex-col after:-z-10 cursor-pointer relative after:transition-all hover:after:top-0 after:h-full after:w-full after:content-[""] after:bg-primary after:absolute transiiton-all z-20 bg-third ${selectedItem === 'Transactions' ? 'after:top-0' : 'after:top-full'
              }`}>
            <i class="text-xl sm:text-3xl mb-1 fa-regular fa-file-lines"></i>
            Transactions
          </li>
          <li
            onClick={() => { setToggle(!toggle); onItemClick('My Profile') }}
            className={`flex items-center overflow-hidden h-[5em] sm:h-[6em] mx-4 sm:mx-8 mt-4 p-3 sm:p-4 rounded-md after:top-0 flex-col after:-z-10 cursor-pointer relative after:transition-all hover:after:top-0 after:h-full after:w-full after:content-[""] after:bg-primary after:absolute transiiton-all z-20 bg-third ${selectedItem === 'My Profile' ? 'after:top-0' : 'after:top-full'
              }`}>
            <i className="fa-regular fa-user text-xl sm:text-3xl mb-1"></i>
            My Profile
          </li>
        </ul>
        <Footer />
      </aside>
    </div>
  );
}

export default Sidebar;
