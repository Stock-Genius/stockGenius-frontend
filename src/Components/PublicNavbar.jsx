import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function PublicNavbar() {

    const [navbar, setNavbar] = useState(false)

    window.addEventListener('scroll', () => {
        if (window.scrollY > 150) {
            setNavbar(true)
        }
        else {
            setNavbar(false)
        }
    });

    return (
        <header className={`py-4 shadow px-4 duration-700 bg-white z-50 top-0 ${navbar ? 'sticky sm:px-20 lg:shadow' : 'relative sm:px-10'} `}>
            <div className='max-w-7xl w-full mx-auto flex flex-wrap items-center gap-4'>

                <Link to='/'>
                    <img src="/img/logo.png" alt="logo" className='sm:w-40 w-28 cursor-pointer' />
                </Link>

                <div className='flex gap-2 sm:gap-4 ml-auto lg:order-1'>
                    <Link to='/login'>
                        <button type="button"
                            className="sm:px-6 px-4 py-2 rounded text-white text-sm tracking-wider font-medium outline-none border-2 border-primary bg-primary hover:bg-transparent hover:text-black transition-all duration-300">Login</button>
                    </Link>
                    <Link to='/register'>
                        <button type="button"
                            className="sm:px-6 px-4 py-2 rounded text-white text-sm tracking-wider font-medium outline-none border-2 border-[#35306A] bg-[#35306A] hover:bg-transparent hover:text-black transition-all duration-300">Sign Up</button>
                    </Link>
                </div>
            </div>
        </header>
    )
}

export default PublicNavbar
