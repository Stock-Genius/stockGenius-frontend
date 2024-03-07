import React, { useState } from 'react'
import Sidebar from './Sidebar'
import Inventory from './Inventory'
import Transactions from './Transactions'
import UserInfo from './UserInfo'
import ServerError from './ServerError'
import Header from './Header'
import AdminDashboard from './AdminDashboard'


function Profile({ toggle, setToggle, darkMode, setDarkMode }) {
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
            case 'Admin':
                return <AdminDashboard />;
            default:
                return <ServerError />;
        }
    };

    return (
        <>
            <Header toggle={toggle} setToggle={setToggle} setDarkMode={setDarkMode} darkMode={darkMode} />
            <div className='flex justify-center dark:bg-main'>
                <Sidebar toggle={toggle} setToggle={setToggle} onItemClick={handleItemClick} selectedItem={selectedItem} />
                <div className='w-full min-h-screen dark:bg-main'>
                    {renderComponent()}
                </div>
            </div>
        </>
    )
}

export default Profile
