import { useState } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
// import './App.css'
import Home from './pages/home/Home';
import Login from './pages/login/Login';
import { useContext } from 'react';
import { DarkModeContext } from './context/darkModeContext';
import classes from './styles/dark.module.scss'
import { AuthContext } from './context/AuthContext';
import Single from './pages/single/Single';
import New from './pages/new/New';
import { userInputs } from "./formSource.js";
import List from './pages/list/List';
import { hotelColumns, roomColumns, userColumns } from './components/datatable/datatablesource';
import NewHotel from './pages/newHotel/NewHotel.jsx';
import NewRoom from './pages/newRoom/NewRoom.jsx';

function App() {
  const { darkMode } = useContext(DarkModeContext);

  const ProtectedRoute = ({ children }) => {
    const { user } = useContext(AuthContext);

    if (!user) {
      return <Navigate to={"/login"} />
    }
    return children
  }

  return (
    <div className={`${classes.app} ${darkMode ? classes.dark : ''}`}>
      <BrowserRouter>
        <Routes>
          <Route path="/">
            <Route path="login" element={<Login />} />
            <Route index element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            } />
            <Route path='users'>
              <Route index element={
                <ProtectedRoute>
                  <List columns={userColumns} />
                </ProtectedRoute>}>
              </Route>
              <Route path=':userId' element={
                <ProtectedRoute>
                  <Single />
                </ProtectedRoute>
              } />
              <Route path='new' element={
                <ProtectedRoute>
                  <New inputs={userInputs} title="Add new user" />
                </ProtectedRoute>
              } />
            </Route>
            <Route path='hotels'>
              <Route index element={
                <ProtectedRoute>
                  <List columns={hotelColumns} />
                </ProtectedRoute>}>
              </Route>
              <Route path=':userId' element={
                <ProtectedRoute>
                  <Single />
                </ProtectedRoute>
              } />
              <Route path='new' element={
                <ProtectedRoute>
                  <NewHotel />
                </ProtectedRoute>
              } />
            </Route>
            <Route path='rooms'>
              <Route index element={
                <ProtectedRoute>
                  <List columns={roomColumns} />
                </ProtectedRoute>}>
              </Route>
              <Route path=':userId' element={
                <ProtectedRoute>
                  <Single />
                </ProtectedRoute>
              } />
              <Route path='new' element={
                <ProtectedRoute>
                  <NewRoom />
                </ProtectedRoute>
              } />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
