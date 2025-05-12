// import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/home/Home';
import List from './pages/list/List';
import Hotel from './pages/hotel/Hotel';
import Login from './pages/login/Login';

function App() {

  /**
   * ====
   * TODO
   * ====
   * - deploy backend
   * - attractions form
   * - taxi form
   * - search results for featured country
   * - search results for featured property type
   * 
   * ====
   * FIXES
   * ====
   * - select single date on date picker 
   * 
   * 
   * 
   * ====
   * DONE
   * ====
   * - car rental form
   * - flight form
   * - adjust image gallery on hotel page
   * - fix datepicker/roompicker box posiTion on responsive
   * - fix hotel page crashing when visting from home (set date & room default value if not selected from home form
   */

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/hotels" element={<List />} />
        <Route path="/hotels/:id" element={<Hotel />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
