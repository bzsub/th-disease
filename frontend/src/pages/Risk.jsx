import React, { useEffect, useState } from 'react'

import { todoApi } from "../api/todoApi";


import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

const Risk = () => {
    const [diseaseList, setDiseaseList] = useState([])
    const [selectedDisease, setSelectedDisease] = useState(null)

    const { get } = todoApi();
    return (
        <>
        
        <Autocomplete
            // onChange={(event, value) => getDiseaseByName(value)}
            sx={{marginTop:"10rem"}}
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
    )
}

export default Risk