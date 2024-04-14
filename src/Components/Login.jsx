import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Message from './Message';
import Loader from './Loader';
import { login } from '../actions/action';
import PublicNavbar from './PublicNavbar';
import Footer from './Footer';


const initialState = {
  email: '',
  password: '',
};

function Login() {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [user, setUser] = useState(initialState);
  const [alertBox, setAlertBox] = useState(false);

  const { email, password } = user;


  const userLogin = useSelector((state) => state.userLogin);
  const { loading, error, userInfo } = userLogin;

  useEffect(() => {
    if (userInfo || error) {
      setAlertBox(true);
    };

    if (userInfo) {
      setTimeout(() => {
        setAlertBox(false);
      }, 2000);
      navigate('/dashboard');
    };
  }, [navigate, dispatch, userLogin]);


  const handleValue = (e) => {
    setUser({
      ...user, [e.target.name]: e.target.value,
    });
  };

  const submitHandler = () => {
    dispatch(login(user));
  };

  return (
    <>
      <PublicNavbar />
      {
        loading ? (<Loader />) : (
          <div className="flex flex-col md:flex-row items-center justify-center min-h-screen p-6 bg-white">
            {alertBox && <Message success={userInfo ? userInfo.success : error && false} message={userInfo ? userInfo.message : error && error} setShowAlertBox={setAlertBox} />}
            <div className="mb-8">
              <img
                src='/img/login.jpg'
                alt="Illustration"
                className="w-full max-w-md h-auto mx-auto"
              />
            </div>

            <div className='w-full max-w-md mx-auto'>
              <h1 className="text-2xl font-bold mb-4 text-center">Login</h1>
              <div className="mb-4 relative pb-4">
                <input
                  type="text"
                  autoFocus
                  placeholder="Email Id"
                  name="email"
                  value={email}
                  onChange={handleValue}
                  className="bg-gray-200 w-full p-2 border rounded-lg"
                />
              </div>
              <div className="mb-4 relative pb-4">
                <input
                  type="password"
                  placeholder="Password"
                  name="password"
                  value={password}
                  onChange={handleValue}
                  className="bg-gray-200 w-full p-2 border rounded-lg"
                />
              </div>
              <div className="w-full flex flex-col justify-center items-center">
                <button
                  onClick={submitHandler}
                  className="bg-primary text-white px-4 py-2 rounded-2xl hover:opacity-90 w-full">
                  Login
                </button>
                <p className="mt-4 text-center">
                  New User? <span className='underline font-bold cursor-pointer' onClick={() => { navigate('/register') }}>Register</span>
                </p>
              </div>
            </div>
          </div>
        )}
      <div className='py-8 '>
        <Footer />
      </div>
    </>
  )
}
export default Login;