import React from 'react';
import { useNavigate } from 'react-router-dom';

function MainPage() {
    const navigate = useNavigate()
    return (
        <>
           <div className='h-screen w-full mainBg bg-cover flex justify-center items-center p-4'>
                <div className='backdrop-blur-sm max-w-screen-lg border border-zinc-700 rounded p-6 md:p-12'>
                    <h1 className='text-3xl md:text-6xl text-center text-white  '>Stock Genius</h1>
                    <p className='text-center uppercase tracking-[4px] mb-8 text-neutral-100'>Inventory Management Tool</p>
                    <p className='text-zinc-300 mb-6'>Introducing our powerful <span className='text-white font-semibold underline'>Inventory Management Tool!</span> Effortlessly organize and track your store or warehouse items. Manage stock, track profits, and display daily sales. <br /> <br /> <span className='font-semibold text-white'>With features like:</span>  <span className="underline">Transaction history</span> and <span className="underline">Date filters,</span> it's the ultimate solution for efficient inventory control. Say goodbye to forgotten prices with the convenient search filter! Register now for seamless business management.</p>

                    <div className='flex justify-center items-center space-x-4'>
                        <button onClick={() => navigate('/register')} className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline-blue active:bg-blue-800'>
                            Sign Up
                        </button>
                        <button onClick={() => navigate('/login')} className='bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline-green active:bg-green-800'>
                            Login
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
};

export default MainPage;