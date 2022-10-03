import './App.css';
import React from 'react'

import { Routes, Route, Link, useNavigate } from "react-router-dom";

import Disease from './pages/Disease';
import Risk from './pages/Risk';
import Symptom from './pages/Symptom';
import Navbar from './components/Navbar';

function App() {
  
  
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Disease />} />
        <Route path="/risk" element={<Risk />} />
        <Route path="/symptom" element={<Symptom />} />
      </Routes>
      
    </>
  );
}

export default App;

