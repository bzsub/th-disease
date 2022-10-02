import './App.css';
import React, { useEffect, useState } from 'react'

import { todoApi } from "./api/todoApi";

import { Routes, Route, Link, useNavigate } from "react-router-dom";

import Disease from './pages/Disease';
import Risk from './pages/Risk';
import Symptom from './pages/Symptom';
import Navbar from './components/Navbar';

import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';



function App() {
  
  
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/disease" element={<Disease />} />
        <Route path="/risk" element={<Risk />} />
        <Route path="/symptom" element={<Symptom />} />
      </Routes>
      
    </>
  );
}

export default App;

