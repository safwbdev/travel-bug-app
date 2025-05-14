import classes from './styles/dark.module.scss'
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import {
  Edit,
  Home,
  List,
  Login,
  NewUser,
  NewHotel,
  NewRoom,
  Single,
  EditHotel,
} from './pages';
import { useContext } from 'react';
import { DarkModeContext } from './context/darkModeContext';
import { AuthContext } from './context/AuthContext';
import { hotelColumns, roomColumns, userColumns, attractionsColumns } from './components/datatable/datatablesource';
import { HOTELS, LOGIN, NEW, ROOMS, ROOT, BY_ID, USERS, EDIT, ATTRACTIONS } from './routes.js';
import { ToastContainer } from 'react-toastify';
import Main from './layout/Main.jsx';
import NewAttraction from './pages/newAttraction/NewAttraction.jsx';

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
   * Edit Hotel data for photos & rooms
   */

  return (
    <div className={`${classes.app} ${darkMode ? classes.dark : ''}`}>
      <BrowserRouter>
        <Routes>
          <Route path={ROOT} element={<Main />}>
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
              <Route path={`${EDIT}/${BY_ID}`} element={
                <ProtectedRoute>
                  <Edit />
                </ProtectedRoute>
              } />
              <Route path={NEW} element={
                <ProtectedRoute>
                  <NewUser />
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
              <Route path={`${EDIT}/${BY_ID}`} element={
                <ProtectedRoute>
                  <EditHotel />
                </ProtectedRoute>
              } />
            </Route>
            <Route path={ATTRACTIONS}>
              <Route index element={
                <ProtectedRoute>
                  <List columns={attractionsColumns} />
                </ProtectedRoute>}>
              </Route>
              <Route path={BY_ID} element={
                <ProtectedRoute>
                  <Single />
                </ProtectedRoute>
              } />
              <Route path={NEW} element={
                <ProtectedRoute>
                  <NewAttraction />
                </ProtectedRoute>
              } />
              <Route path={`${EDIT}/${BY_ID}`} element={
                <ProtectedRoute>
                  <EditHotel />
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
              <Route path={`${EDIT}/${BY_ID}`} element={
                <ProtectedRoute>
                  <Edit />
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
