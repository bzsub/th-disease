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
  const [diseaseList, setDiseaseList] = useState([])
  const [selectedDisease, setSelectedDisease] = useState(null)

  const { get } = todoApi();

  const getNamesOfDiseases = async () => {
    const response = await get(`/disease`)
    console.log(response.data);
    setDiseaseList(response.data)
    console.log(response.data.map(disease => disease.name))
  }

  const getDiseaseByName = async (name) => {
    if (!name) return;
    const id = diseaseList.filter(disease => disease.name === name)[0]._id
    const response = await get(`/disease/${id}`)
    console.log(response.data)
    setSelectedDisease(response.data)
  }

  useEffect(() => {
    getNamesOfDiseases()
    //eslint-disable-next-line
  }, [])
  
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

