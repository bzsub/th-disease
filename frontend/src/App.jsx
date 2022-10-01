import './App.css';

import { Routes, Route, Link, useNavigate } from "react-router-dom";

import Disease from './pages/Disease';
import Navbar from './components/Navbar';
import Risk from './pages/Risk';
import Symptom from './pages/Symptom';


function App() {
  return (
    <>
    <Navbar/>
        <Routes>  
        <Route path="/disease" element={<Disease />} />
        <Route path="/risk" element={<Risk />} />
        <Route path="/symptom" element={<Symptom />} />  
      </Routes>    
    </>
  );
}

export default App;
