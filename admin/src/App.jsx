import { useState } from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
// import './App.css'
import Home from './pages/home/Home';
import Login from './pages/login/Login';
import { useContext } from 'react';
import { DarkModeContext } from './context/darkModeContext';
import classes from './styles/dark.module.scss'

function App() {
  const { darkMode } = useContext(DarkModeContext)

  return (
    <div className={`${classes.app} ${darkMode ? classes.dark : ''}`}>
      <BrowserRouter>
        <Routes>
          <Route path="/">
            <Route index element={<Home />} />
            <Route path="login" element={<Login />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
