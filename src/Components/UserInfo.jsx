import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logout, getUserDetails } from '../actions/action';
import Popup from './Popup';
import Loader from './Loader';
import Message from './Message';
import { useNavigate } from 'react-router-dom';
import ServerError from './ServerError';

function UserInfo() {
  const [popup, setPopup] = useState(false);
  const [value, setValue] = useState("");
  const [alertBox, setAlertBox] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userDetails = useSelector((state) => state.userDetails)
  const { loading, error, user } = userDetails;
  
  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin;

  const userUpdateProfile = useSelector((state) => state.userUpdateProfile)
  const { success } = userUpdateProfile;

  useEffect(() => {
    if (!userInfo) {
      navigate('/login');
      setAlertBox(false);
    } else {
      if (success || error) setAlertBox(true);
      if (!user || !user.name || success) {
        dispatch({ type: 'USER_UPDATE_PROFILE_RESET' });
        dispatch(getUserDetails());
      }
    }
  }, [dispatch, navigate, user, success]);

  const handleLogout = () => {
    const status = window.confirm('Are you sure you want to log out?');
    if (status) {
      dispatch(logout());
    }
  };

  const handlePopup = (e) => {
    setValue(e.target.value);
    setPopup(true);
  };

  return (
    <div className="p-4 dark:bg-secondary m-6">
      {alertBox && <Message success={true} message={'Profile Updated'} setShowAlertBox={setAlertBox} />}
      {error && <ServerError error={error} />}
      {loading ? (
        <Loader />
      ) : user && (
        <>
          <h1 className="text-2xl font-semibold mb-4 dark:text-neutral-100 tracking-wider">USER PROFILE</h1>
          <div className="flex flex-col md:flex-row items-center md:gap-10 gap-8">
            <div className="w-40 h-40 rounded-full overflow-hidden flex justify-center items-center">
              <img
                src="/img/user.jpeg"
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <h2 className="text-xl font-semibold mb-2 capitalize dark:text-white">{user.name}</h2>
              <p className="text-gray-600 dark:text-neutral-400 ">{user.email}</p>
              <p className="text-gray-600 dark:text-neutral-400">{user.shopname}</p>
              <p className="text-gray-600 dark:text-neutral-400">{user.address}</p>
            </div>

            <button
              onClick={handlePopup}
              value='profileEdit'
              className="flex justify-center items-center gap-2 w-28 h-10 cursor-pointer rounded-md shadow-2xl text-white font-semibold bg-primary hover:opacity-90 duration-300 hover:shadow-xl"
            >
              Edit <i className="fas fa-pencil pointer-events-none"></i>
            </button>
            <button
              onClick={handleLogout}
              className="group flex items-center justify-start w-11 h-11 bg-red-600 rounded-full cursor-pointer relative overflow-hidden transition-all hover:w-32 hover:rounded-lg active:translate-x-1 active:translate-y-1 shadow-2xl text-white font-semibold bg-gradient-to-r from-red-500 to-red-600 dark:from-red-600 dark:to-red-700 hover:shadow-xl duration-300"
            >
              <div className="flex items-center justify-center w-full transition-all duration-300 group-hover:justify-start group-hover:px-3 text-white">
                <i className="fa-solid fa-right-from-bracket"></i>
              </div>
              <div className="absolute right-5 transform translate-x-full opacity-0 text-white text-lg font-semibold transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100">
                Logout
              </div>
            </button>
          </div>
          <Popup
            state={popup}
            setPopup={setPopup}
            popupValue={value}
            selectedProduct={""}
            setUpdateProduct={""}
            productIndex={""}
          />
        </>
      )}
    </div>
  );
}

export default UserInfo;
