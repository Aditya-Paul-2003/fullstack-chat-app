import React from 'react'
import { useEffect } from 'react';
import Navbar from './components/Navbar.jsx'

import HomePage from './pages/HomePage.jsx'
import LoginPage from './pages/LoginPage.jsx'
import ProfilePage from './pages/ProfilePage.jsx'
import SettingsPage from './pages/SettingsPage.jsx'
import SignUpPage from './pages/SignUpPage.jsx'

import {Loader} from 'lucide-react'
import {Navigate, Route, Routes } from 'react-router-dom'
import { useAuthStore } from './store/useAuthStore.js';



const App = () => {
    
    const {authUser, checkAuth, isCheckingAuth} = useAuthStore()
    
    useEffect(() => {
        checkAuth()
    },[checkAuth]);

    if(isCheckingAuth && !authUser) return(
      <div className="flex items-center justify-center h-screen">
        <Loader className="size-10 animate-spin"/>
      </div>
    )
    
  return (
    <div>
        <Navbar/>
        <Routes>
            <Route path="/" element={authUser ? <HomePage /> : <Navigate to="/login" />} />
            <Route path="/login" element={!authUser ? <LoginPage /> : <Navigate to="/" />} />
            <Route path="/profile" element={!authUser ? <ProfilePage /> : <Navigate to="/login" />} />
            <Route path="/settings" element={<SettingsPage />} />
            <Route path="/signup" element={!authUser ? <SignUpPage /> : <Navigate to="/" />} />

        </Routes>
    </div>
  )
}

export default App
