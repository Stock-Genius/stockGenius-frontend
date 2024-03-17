import React from 'react'
import { Link } from 'react-router-dom'
import Footer from './Footer'

function LandingPage() {
    return (
        <>
            <header className="py-4 px-4 sm:px-10 bg-white z-50 relative">
                <div className='max-w-7xl w-full mx-auto flex flex-wrap items-center gap-4'>

                    <img src="/img/logo.png" alt="logo" className='sm:w-40 w-28 cursor-pointer' />

                    <div className='flex ml-auto lg:order-1'>
                        <Link to='/gettingstarted'>
                            <button
                                className='bg-blue-100 hover:bg-blue-200 flex items-center transition-all font-semibold rounded-md px-5 py-3'>Get
                                started
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-[14px] fill-current ml-2" viewBox="0 0 492.004 492.004">
                                    <path
                                        d="M484.14 226.886 306.46 49.202c-5.072-5.072-11.832-7.856-19.04-7.856-7.216 0-13.972 2.788-19.044 7.856l-16.132 16.136c-5.068 5.064-7.86 11.828-7.86 19.04 0 7.208 2.792 14.2 7.86 19.264L355.9 207.526H26.58C11.732 207.526 0 219.15 0 234.002v22.812c0 14.852 11.732 27.648 26.58 27.648h330.496L252.248 388.926c-5.068 5.072-7.86 11.652-7.86 18.864 0 7.204 2.792 13.88 7.86 18.948l16.132 16.084c5.072 5.072 11.828 7.836 19.044 7.836 7.208 0 13.968-2.8 19.04-7.872l177.68-177.68c5.084-5.088 7.88-11.88 7.86-19.1.016-7.244-2.776-14.04-7.864-19.12z"
                                        data-original="#000000" />
                                </svg>
                            </button>
                        </Link>
                    </div>
                </div>
            </header>

            <div className="min-h-[500px] bg-blue-100 px-4 sm:px-10">
                <div className="max-w-7xl w-full mx-auto py-16">
                    <div className="grid lg:grid-cols-2 justify-center items-center gap-10">
                        <div>
                            <h1 className="md:text-5xl text-4xl font-extrabold mb-6 md:!leading-[55px]">Advance analysis to grow your
                                business
                            </h1>
                            {/* <p className="text-base leading-relaxed">Unlock the potential of your business with advanced analysis tools
                                that provide insightful strategies. Our cutting-edge analytics empower you to make informed decisions and
                                strategically scale your business.</p> */}
                            <p className='mb-6 leading-relaxed'>Unlock the potential of your business with advanced analysis tools powerful Effortlessly organize and track your store or warehouse items. Manage stock, track profits, and display daily sales. <br />With features like: Transaction history and Date filters, it's the ultimate solution for efficient inventory control. Say goodbye to forgotten prices with the convenient search filter! Register now for seamless business management.</p>
                            <div className="flex flex-wrap gap-y-4 gap-x-8 mt-8">
                                <Link to='/gettingstarted'>
                                    <button
                                        className='bg-[#333] hover:bg-[#111] text-white flex items-center transition-all font-semibold rounded-md px-5 py-4'>Get
                                        started
                                        <svg xmlns="http://www.w3.org/2000/svg" className="w-[14px] fill-current ml-2"
                                            viewBox="0 0 492.004 492.004">
                                            <path
                                                d="M484.14 226.886 306.46 49.202c-5.072-5.072-11.832-7.856-19.04-7.856-7.216 0-13.972 2.788-19.044 7.856l-16.132 16.136c-5.068 5.064-7.86 11.828-7.86 19.04 0 7.208 2.792 14.2 7.86 19.264L355.9 207.526H26.58C11.732 207.526 0 219.15 0 234.002v22.812c0 14.852 11.732 27.648 26.58 27.648h330.496L252.248 388.926c-5.068 5.072-7.86 11.652-7.86 18.864 0 7.204 2.792 13.88 7.86 18.948l16.132 16.084c5.072 5.072 11.828 7.836 19.044 7.836 7.208 0 13.968-2.8 19.04-7.872l177.68-177.68c5.084-5.088 7.88-11.88 7.86-19.1.016-7.244-2.776-14.04-7.864-19.12z"
                                                data-original="#000000" />
                                        </svg>
                                    </button>
                                </Link>

                            </div>
                        </div>
                        <div className="max-lg:mt-12 h-full">
                            <img src="https://readymadeui.com/analtsis.webp" alt="banner img" className="w-full h-full object-cover" />
                        </div>
                    </div>
                </div>
            </div>

            {/* second section  */}

            <div className="px-4 sm:px-10 mt-28">
                <div className="max-w-7xl w-full mx-auto grid md:grid-cols-2 justify-center items-center gap-10">
                    <div>
                        <h2 className="md:text-4xl text-3xl font-extrabold mb-6">100% Secure your data</h2>
                        <p>Veniam proident aute magna anim excepteur et ex consectetur velit ullamco veniam minim aute sit. Elit
                            occaecat officia et laboris Lorem minim. Officia do aliqua adipisicing ullamco in. consectetur velit ullamco
                            veniam minim aute sit.</p>
                    </div>
                    <div className="w-full h-full">
                        <img src="https://readymadeui.com/login-image.webp" alt="feature" className="w-full h-full object-cover" />
                    </div>
                </div>
            </div>

            {/* third section */}
            <div className="mt-28 px-4 sm:px-10 bg-blue-100">
                <div
                    className="min-h-[400px] relative h-full max-w-2xl mx-auto flex flex-col justify-center items-center text-center px-6 py-16">
                    <h2 className="md:text-4xl text-3xl font-extrabold mb-6">Your work, everywhere you are</h2>
                    <p>Veniam proident aute magna anim excepteur et ex consectetur velit ullamco veniam minim
                        aute sit. Elit occaecat officia et laboris Lorem minim. Officia do aliqua adipisicing ullamco in. consectetur
                        velit ullamco veniam minim aute sit.</p>
                    <Link to='/gettingstarted'>
                        <button
                            className="bg-[#333] hover:bg-[#111] text-white flex items-center transition-all font-semibold rounded-md px-5 py-4 mt-8">
                            Get started
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-[14px] fill-current ml-2" viewBox="0 0 492.004 492.004">
                                <path
                                    d="M484.14 226.886 306.46 49.202c-5.072-5.072-11.832-7.856-19.04-7.856-7.216 0-13.972 2.788-19.044 7.856l-16.132 16.136c-5.068 5.064-7.86 11.828-7.86 19.04 0 7.208 2.792 14.2 7.86 19.264L355.9 207.526H26.58C11.732 207.526 0 219.15 0 234.002v22.812c0 14.852 11.732 27.648 26.58 27.648h330.496L252.248 388.926c-5.068 5.072-7.86 11.652-7.86 18.864 0 7.204 2.792 13.88 7.86 18.948l16.132 16.084c5.072 5.072 11.828 7.836 19.044 7.836 7.208 0 13.968-2.8 19.04-7.872l177.68-177.68c5.084-5.088 7.88-11.88 7.86-19.1.016-7.244-2.776-14.04-7.864-19.12z"
                                    data-original="#000000"></path>
                            </svg>
                        </button>
                    </Link>
                </div>
            </div>
            <div className='py-5 bg-secondary'>
                <Footer />

            </div>
        </>
    )
}

export default LandingPage
