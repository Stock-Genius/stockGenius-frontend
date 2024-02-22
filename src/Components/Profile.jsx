import React, { useState } from 'react'
import Sidebar from './Sidebar'
// import Home from './Home'
import Inventory from './Inventory'
import Transactions from './Transactions'
import UserInfo from './UserInfo'
import ServerError from './ServerError'
import Header from './Header'


function Profile({ toggle, setToggle }) {
    const [selectedItem, setSelectedItem] = useState('Inventory');

    const handleItemClick = (item) => {
        setSelectedItem(item);
    };

    const renderComponent = () => {
        switch (selectedItem) {
            case 'Inventory':
                return <Inventory />;
            case 'Transactions':
                return <Transactions />;
            case 'My Profile':
                return <UserInfo />;
            default:
                return <ServerError />;
        }
    };

    return (
        <>
            <Header toggle={toggle} setToggle={setToggle} />
            <div className='flex'>
                <Sidebar toggle={toggle} setToggle={setToggle} onItemClick={handleItemClick} selectedItem={selectedItem} />
                <div className='w-full p-4'>
                    {renderComponent()}
                </div>
            </div>
        </>
    )
}

export default Profile
