import React, { useEffect, useState } from 'react';
import { logout } from '../actions/action';
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import Popup from './Popup';
import Loader from './Loader';
import Message from './Message';



function UserInfo() {

  const [popup, setPopup] = useState(false);
  const [value, setValue] = useState("");
  const [selectedProduct, setSeletedProduct] = useState('');
  const [productIndex, setProductIndex] = useState("");
  const [alertBox, setAlertBox] = useState();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // useEffect(() => {
  //   if (userInfo || error) {
  //     console.log('if block was run but why i dont know');
  //     setAlertBox(true);
  //   };

  //   if (userInfo && userInfo.data) {
  //     setTimeout(() => {
  //       setAlertBox(false);
  //     }, 2000);
  //     navigate('/dashboard');
  //   };
  // }, [navigate, dispatch, userLogin]);

  const userLogin = useSelector((state) => state.userLogin);
  const { loading, error, userInfo } = userLogin;

  const handleLogout = () => {
    const status = window.confirm('Are you sure you want to log out ?');
    if (status) {
      dispatch(logout());
    };
  }

  const handlePopup = (e) => {
    // setValue(e.target.value);
    // setPopup(true);
    alert('Not available right now!');
  }

  return (
    <>
      {userInfo ? (
        <div className="p-4">
          <h1 className="text-2xl font-semibold mb-4">Profile</h1>
          <div className="flex flex-col md:flex-row items-center md:gap-10 gap-8">
            <div className="w-40 h-40 rounded-full overflow-hidden border flex justify-center items-center">
              <img
                src='/img/user.jpeg'
                alt="Profile"
                className="w-full h-full object-cover" />
            </div>
            <div>
              <h2 className="text-xl font-semibold mb-2 capitalize">{userInfo ? userInfo.name : null}</h2>
              <li className="text-gray-600">{userInfo ? userInfo.email : null}</li>
              <li className="text-gray-600">{userInfo ? userInfo.shopname : null}</li>
              <li className="text-gray-600">{userInfo ? userInfo.address : null}</li>
            </div>

            <button
              onClick={handlePopup}
              value='profileEdit'
              className="flex justify-center items-center gap-2 w-28 h-10 cursor-pointer rounded-md shadow-2xl text-white font-semibold bg-gradient-to-r from-[#4796BD] via-[#4796BD] to-[#4796BD] hover:shadow-xl hover:shadow-blue-300 hover:scale-105 duration-300 hover:from-[#4796BD] hover:to-[#4796BD]"
            >Edit <i className="fas fa-pencil pointer-events-none"></i>
            </button>
            <button
              onClick={handleLogout}
              className="group flex items-center justify-start w-11 h-11 bg-red-600 rounded-full cursor-pointer relative overflow-hidden transition-all duration-200 shadow-lg hover:w-32 hover:rounded-lg active:translate-x-1 active:translate-y-1 shadow-2xl text-white font-semibold bg-gradient-to-r from-[#fb7185] via-[#e11d48] to-[#be123c] hover:shadow-xl hover:shadow-red-500 hover:scale-105 duration-300 hover:from-[#be123c] hover:to-[#fb7185]">
              <div
                className="flex items-center justify-center w-full transition-all duration-300 group-hover:justify-start group-hover:px-3 text-white">
                <i className="fa-solid fa-right-from-bracket"></i>
              </div>
              <div
                className="absolute right-5 transform translate-x-full opacity-0 text-white text-lg font-semibold transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100">
                Logout
              </div>
            </button>
          </div>
          <Popup
            state={popup}
            setPopup={setPopup}
            popupValue={value}
            selectedProduct={selectedProduct}
            setUpdateProduct={setSeletedProduct}
            productIndex={productIndex} />
        </div>
      ) : loading ? (
        <Loader />
      ) : error ? (
        alertBox && <Message success={userInfo ? userInfo.success : error && false} message={userInfo ? userInfo.message : error && error} setShowAlertBox={setAlertBox} />
      ) : null}
    </>
  );

}

export default UserInfo;
