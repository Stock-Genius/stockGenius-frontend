import React, { useEffect, useState } from 'react'
import { Route, Routes, useNavigate } from 'react-router-dom'
import Login from './Components/Login'
import Register from './Components/Register'
import Profile from './Components/Profile'
import ServerError from './Components/ServerError'
import MainPage from './Components/MainPage'

function App() {

  const [toggleSidebar, setSidebar] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('userInfo'));
    if (!user?.token) {
      navigate('/');
    } else {
      navigate('/dashboard');
    }
  }, []);


  return (
    <div className={`${darkMode && 'dark'}`}>
      {/* <Header toggle={toggleSidebar} setToggle={setSidebar} /> */}
      <Routes>
        <Route path='/' element={<MainPage />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/servererror' element={<ServerError />} />
        <Route path='/dashboard' element={<Profile toggle={toggleSidebar} setToggle={setSidebar} darkMode={darkMode} setDarkMode={setDarkMode} />} />
      </Routes>
    </div>
  )
}

export default App;
