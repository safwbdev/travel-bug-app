// import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/home/Home';
import List from './pages/list/List';
import Hotel from './pages/hotel/Hotel';
import Login from './pages/login/Login';
import AttractionList from './pages/attractions/AttractionList';
import AttractionPage from './pages/attractions/AttractionPage';

function App() {

  /**
   * ====
   * TODO
   * ====
   * - data for flights
   * - data for Car rentals
   * - data for taxis
   * - Mobile Responsiveness
   * ====
   * FIXES
   * ====
   * - select single date on date picker (flights & taxis)
   * 
   * 
   * =====================
   * Mobile Responsiveness
   * =====================
   * + Home
   * - List
   * - Forms
   * - Single Pages
   * + sliders on mobile
   * 
   * 
   * 
   * ====
   * DONE
   * ====
   * - Sign Out 
   * - taxi form
   * - flight form
   * - deploy backend
   * - car rental form
   * - attractions page
   * - attractions form
   * - Register/Login Links
   * - data for attractions
   * - Mail list margin/padding bug
   * - adjust image gallery on hotel page
   * - search results for featured country
   * - Adjust header text & sign in button
   * - search results for featured property type
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
        <Route path="/attractions" element={<AttractionList />} />
        <Route path="/attractions/:id" element={<AttractionPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
