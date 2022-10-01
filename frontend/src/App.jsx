import './App.css';
import React, { useEffect, useState } from 'react'

import { todoApi } from "./api/todoApi";


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
  }, [])
  
  return (
    <>
      
      <Autocomplete
        onChange={(event, value) => getDiseaseByName(value)}
        options={diseaseList.map(disease => disease.name)}
        renderInput={params => <TextField {...params} label="diseaseList"/> }
      />

      {
        
        selectedDisease && <Box sx={{marginTop:"8rem",padding:"2rem"}}>

          <Typography variant="p" gutterBottom sx={{fontSize:"1.5rem"}}>
            disease name: 
          </Typography>
          <Typography variant="h2" gutterBottom>
          {selectedDisease.name}
          </Typography>
          <Typography variant="p" gutterBottom sx={{fontSize:"1.5rem"}}>
            disease description: 
          </Typography>
          <Typography variant="h2" gutterBottom>
          {selectedDisease.description}
          </Typography>
          
          {
            selectedDisease.risks.length > 0 && <>
              <Typography variant="p" gutterBottom sx={{fontSize:"1.5rem"}}>
                disease risk factors: 
              </Typography>
              {selectedDisease.risks.map((risk,id) => <li key={id}>{risk}</li>)}
              </>
          }
        
        </Box>
      }
      
    </>
  );
}

export default App;
