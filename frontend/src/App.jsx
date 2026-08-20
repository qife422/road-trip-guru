/* Used React documentation from react.com and the Geeks for Geeks React articles
https://www.geeksforgeeks.org/reactjs/reactjs-basics-concepts-complete-reference/ */

import './App.css';
import NavBar from './components/Navbar';
import { Routes, Route } from 'react-router-dom';
import RoadTripPlaces from './pages/RoadTripPlaces';
import RoadTripRoutes from './pages/RoadTripRoutes';
import TripBudgets from './pages/TripBudgets';
import Places from './pages/Places'
import RoadTrippers from './pages/RoadTrippers';
import Attractions from './pages/Attractions';
import Home from './pages/Home'

function App() {
  return (
    <>
      <link rel="preconnect" href="https://fonts.googleapis.com"></link>
      <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin></link>
      <link href="https://fonts.googleapis.com/css2?family=Shrikhand&display=swap" rel="stylesheet"></link>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/road-trippers" element={<RoadTrippers />} />
        <Route path="/road-trip-places" element={<RoadTripPlaces />} />
        <Route path="/road-trip-routes" element={<RoadTripRoutes />} />
        <Route path="/attractions" element={<Attractions />} />
        <Route path="/places" element={<Places />} />
        <Route path="/trip-budgets" element={<TripBudgets />} />
      </Routes>
    </>
  );
}

export default App;