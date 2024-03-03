import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { register } from '../actions/action';
import { useNavigate } from 'react-router-dom';
import Loader from './Loader';
import Message from './Message';


const initialState = {
  name: '',
  email: '',
  password: '',
  confirmPassword: '',
  shopname: '',
  address: '',
};

function Register() {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [user, setUser] = useState(initialState);
  const [alertBox, setAlertBox] = useState(false);

  const { name, email, password, confirmPassword, shopname, address } = user;

  const userRegister = useSelector((state) => state.userRegister);
  const { loading, error, userInfo } = userRegister;

  useEffect(() => {
    if (userInfo || error) {
      setAlertBox(true);
    };

    if (userInfo) {
      setTimeout(() => {
        setAlertBox(false);
      }, 2000);
      navigate('/login');
    };
  }, [navigate, dispatch, userRegister]);

  const handleValue = (e) => {
    setUser({
      ...user, [e.target.name]: e.target.value,
    })
  };

  const submitHandler = () => {
    dispatch(register(user));
  };

  return (
    <>
      {
        loading ? (<Loader />) : (
          <div className="max-w-screen-md mx-auto p-6">
            {alertBox && <Message success={userInfo ? userInfo.success : error && false} message={userInfo ? userInfo.message : error && error} setShowAlertBox={setAlertBox} />}

            <h1 className="text-2xl font-semibold mb-4 text-center">Register</h1>
            <hr className="mb-4" />

            {/* Account Section */}
            <div className="flex md:flex-row flex-col items-center mb-4">
              <div className="flex md:flex-row flex-col items-center md:items-start md:pr-8 w-full justify-center gap-x-32">
                <h2 className="text-xl text-center font-semibold mb-2 opacity-70">Account</h2>
                <div>
                  <div className=" relative pb-4 w-full">
                    <input
                      onChange={handleValue}
                      type="text"
                      placeholder="Full Name"
                      name="name"
                      value={name}
                      autoFocus
                      className="w-full p-2 pr-16 bg-gray-200 border rounded-lg"
                    />
                  </div>
                  <div className=" relative pb-4">
                    <input
                      onChange={handleValue}
                      type="text"
                      placeholder="Email Id"
                      name="email"
                      value={email}
                      className="w-full p-2 bg-gray-200 border rounded-lg"
                    />
                  </div>
                  <div className=" relative pb-4">
                    <input
                      onChange={handleValue}
                      type="password"
                      placeholder="Password"
                      name="password"
                      value={password}
                      className="w-full p-2 bg-gray-200 border rounded-lg"
                    />
                  </div>
                  <div className=" relative pb-4">
                    <input
                      onChange={handleValue}
                      type="password"
                      placeholder="Confirm Password"
                      name="confirmPassword"
                      value={confirmPassword}
                      className="w-full p-2 bg-gray-200 border rounded-lg"
                    />
                  </div>
                </div>
              </div>
            </div>

            <hr className="mb-4" />

            {/* Shop Details Section */}
            <div className="flex md:flex-row flex-col items-center mb-4">
              <div className="flex md:flex-row flex-col items-center md:items-start md:pr-8 w-full justify-center gap-x-32">
                <h2 className="text-xl text-center font-semibold mb-2 opacity-70">Bussiness Details</h2>
                <div>
                  <div className=" relative pb-4 w-full">
                    <input
                      onChange={handleValue}
                      type="text"
                      placeholder="Bussiness name"
                      name="shopname"
                      value={shopname}
                      className="w-full p-2 pr-16 bg-gray-200 border rounded-lg"
                    />
                  </div>
                  <div className=" relative pb-4">
                    <input
                      type="text"
                      placeholder="Address"
                      name="address"
                      onChange={handleValue}
                      value={address}
                      className="w-full p-2 bg-gray-200 border rounded-lg"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div>
              <div className="w-full flex flex-col justify-center items-center mt-8">
                <button onClick={submitHandler} className="bg-blue-500 text-white px-20 py-2 rounded-2xl hover:bg-blue-600 ">
                  Register
                </button>
                <p className="mt-4">
                  Already have an account ? <span className='underline font-bold cursor-pointer' onClick={() => { navigate('/login') }}>Login</span>
                </p>
              </div>
            </div>
          </div>
        )}

    </>
  );
}

export default Register;
