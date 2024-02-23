import React from 'react';
import Footer from './Footer';


function Sidebar({ onItemClick, selectedItem, toggle, setToggle }) {

  return (
    <div className='md:w-1/4'>
      <aside className={`pt-5 pb-28 fixed flex flex-col justify-between items-between h-screen z-20 md:left-0 bg-gray-800 text-white p-1 w-64 ${toggle ? 'left-0' : '-left-full'}`}>
        <ul>
          <li
            onClick={() => { setToggle(!toggle); onItemClick('Inventory') }}
            className={`flex items-center overflow-hidden p-2 m-4 after:opacity-25 cursor-pointer relative after:transition-all hover:after:left-0 after:h-full after:w-full after:content-[""] after:bg-[#4796BD] after:absolute transiiton-all  ${selectedItem === 'Inventory' ? 'after:left-0' : 'after:-left-full'
              }`}>
            <i className="fas fa-list mr-2"></i>
            Inventory
          </li>
          <li
            onClick={() => { setToggle(!toggle); onItemClick('Transactions') }}
            className={`flex items-center overflow-hidden p-2 m-4 after:opacity-25 cursor-pointer relative after:transition-all hover:after:left-0 after:h-full after:w-full after:content-[""] after:bg-[#4796BD] after:absolute transiiton-all  ${selectedItem === 'Transactions' ? 'after:left-0' : 'after:-left-full'
              }`}>
            <i className="fas fa-file-invoice mr-2"></i>
            Transactions
          </li>
          <li
            onClick={() => { setToggle(!toggle); onItemClick('My Profile') }}
            className={`flex items-center overflow-hidden p-2 m-4 after:opacity-25 cursor-pointer relative after:transition-all hover:after:left-0 after:h-full after:w-full after:content-[""] after:bg-[#4796BD] after:absolute transiiton-all  ${selectedItem === 'My Profile' ? 'after:left-0' : 'after:-left-full'
              }`}>
            <i className="fas fa-user mr-2"></i>
            My Profile
          </li>
        </ul>
        <Footer />
      </aside>
    </div>
  );
}

export default Sidebar;
