import React, { useEffect, useState } from 'react'
import { Route, Routes, useNavigate } from 'react-router-dom'
import Login from './Components/Login'
import Register from './Components/Register'
import Dashboard from './Components/Dashboard'
import ServerError from './Components/ServerError'
import MainPage from './Components/MainPage'
import LandingPage from './Components/LandingPage'


function App() {

  const [toggleSidebar, setSidebar] = useState(true);
  const darkModeLocalStorage = JSON.parse(localStorage.getItem('darkMode')) || false;
  const [darkMode, setDarkMode] = useState(darkModeLocalStorage);
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
    <div className={`${darkMode == true && 'dark'}`}>
      <Routes>
        <Route path='/' element={<LandingPage/>} />
        <Route path='/gettingstarted' element={<MainPage />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/servererror' element={<ServerError />} />
        <Route path='/dashboard' element={<Dashboard toggle={toggleSidebar} setToggle={setSidebar} darkMode={darkMode} setDarkMode={setDarkMode} />} />
      </Routes>
    </div>
  )
}

export default App;
