import classes from './styles/dark.module.scss'
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import {
  Home,
  List,
  Login,
  New,
  NewHotel,
  NewRoom,
  Single,
} from './pages';
import { useContext } from 'react';
import { DarkModeContext } from './context/darkModeContext';
import { AuthContext } from './context/AuthContext';
import { userInputs } from "./formSource.js";
import { hotelColumns, roomColumns, userColumns } from './components/datatable/datatablesource';
import { HOTELS, LOGIN, NEW, ROOMS, ROOT, BY_ID, USERS } from './routes.js';
import { ToastContainer } from 'react-toastify';

function App() {
  const { darkMode } = useContext(DarkModeContext);

  const ProtectedRoute = ({ children }) => {
    const { user } = useContext(AuthContext);

    if (!user) {
      return <Navigate to={"/login"} />
    }
    return children
  }
  /**
   * ====
   * TODO
   * ====
   * apply isAdmin to User creation (Not applicable for now due to cookie/CORS issue)
   * change color brand
   * Edit data
   * Outlet
   */

  return (
    <div className={`${classes.app} ${darkMode ? classes.dark : ''}`}>
      <BrowserRouter>
        <Routes>
          <Route path={ROOT}>
            <Route path={LOGIN} element={<Login />} />
            <Route index element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            } />
            <Route path={USERS}>
              <Route index element={
                <ProtectedRoute>
                  <List columns={userColumns} />
                </ProtectedRoute>}>
              </Route>
              <Route path={BY_ID} element={
                <ProtectedRoute>
                  <Single />
                </ProtectedRoute>
              } />
              <Route path={NEW} element={
                <ProtectedRoute>
                  <New inputs={userInputs} title="Add new user" />
                </ProtectedRoute>
              } />
            </Route>
            <Route path={HOTELS}>
              <Route index element={
                <ProtectedRoute>
                  <List columns={hotelColumns} />
                </ProtectedRoute>}>
              </Route>
              <Route path={BY_ID} element={
                <ProtectedRoute>
                  <Single />
                </ProtectedRoute>
              } />
              <Route path={NEW} element={
                <ProtectedRoute>
                  <NewHotel />
                </ProtectedRoute>
              } />
            </Route>
            <Route path={ROOMS}>
              <Route index element={
                <ProtectedRoute>
                  <List columns={roomColumns} />
                </ProtectedRoute>}>
              </Route>
              <Route path={BY_ID} element={
                <ProtectedRoute>
                  <Single />
                </ProtectedRoute>
              } />
              <Route path={NEW} element={
                <ProtectedRoute>
                  <NewRoom />
                </ProtectedRoute>
              } />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
      <ToastContainer />
    </div>
  )
}

export default App
