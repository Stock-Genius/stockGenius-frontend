import { Link } from 'react-router-dom'
import Footer from './Footer'
import AOS from "aos";
import "aos/dist/aos.css";
import PublicNavbar from './PublicNavbar';
AOS.init()

function LandingPage() {

    return (
        <>

        <PublicNavbar/>

            <div className="min-h-[500px] bg-blue-100 px-4 sm:px-10">
                <div className="max-w-7xl w-full mx-auto py-16">
                    <div className="overflow-hidden grid lg:grid-cols-2 justify-center items-center gap-10">
                        <div data-aos="fade-right" className=''>
                            <h1 className="md:text-5xl text-4xl font-extrabold mb-6 md:!leading-[55px]">Advance analysis to grow your business
                            </h1>
                            <p className='mb-6 leading-relaxed'>Unlock the potential of your business with advanced analysis tools powerful Effortlessly organize and track your store or warehouse items. Manage stock, track profits, and display daily sales. <br />With features like: Transaction history and Date filters, it's the ultimate solution for efficient inventory control. Say goodbye to forgotten prices with the convenient search filter! Register now for seamless business management.</p>
                            <div className="flex flex-wrap gap-y-4 gap-x-8 mt-8">
                                <Link to='/register'>
                                    <button
                                        className='bg-[#35306A] gap-3 hover:bg-[#333] text-white flex items-center transition-all font-semibold rounded-md px-5 py-4'>
                                        Register Now
                                    </button>
                                </Link>
                            </div>
                        </div>
                        <div data-aos="fade-left" className="max-lg:mt-12 h-full">
                            <img src="https://readymadeui.com/analtsis.webp" alt="banner img" className="w-full h-full object-cover" />
                        </div>
                    </div>
                </div>
            </div>

            {/* second section  */}
            <div className="px-4 sm:px-10 mt-28">
                <div className="overflow-hidden max-w-7xl w-full mx-auto grid md:grid-cols-2 justify-center items-center gap-10">
                    <div data-aos="fade-right" data-aos-duration='1000' className='px-4 sm:px-20 mb-12'>
                        <h2 className="md:text-5xl text-3xl font-extrabold mb-6 opacity-80">100% Secure your data</h2>
                        <p>Veniam proident aute magna anim excepteur et ex consectetur velit ullamco veniam minim aute sit. Elit
                            occaecat officia et laboris Lorem minim. Officia do aliqua adipisicing ullamco in. consectetur velit ullamco
                            veniam minim aute sit.</p>
                    </div>
                    <div data-aos="fade-left" data-aos-duration='1000' className="w-full h-full">
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
                    <Link to='/register'>
                        <button
                            className='bg-[#35306A] gap-6 mt-6 hover:bg-[#333] text-white flex items-center transition-all font-semibold rounded-md px-5 py-4'>
                            <span>Get Started</span>
                            <i class="fa-solid fa-arrow-right-long"></i>
                        </button>
                    </Link>
                </div>
            </div>
            <div className='py-8 '>
                <Footer />
            </div>
        </>

    )



}

export default LandingPage
