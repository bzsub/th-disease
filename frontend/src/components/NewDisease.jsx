import React, { useEffect, useState } from 'react'
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Button from "@mui/material/Button";
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';

import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CloseIcon from '@mui/icons-material/Close';
import SaveIcon from '@mui/icons-material/Save';

import { SuccessfulAlert, ErrorAlert } from "../utils/AlertMessages"


const NewDisease = ({disease, riskList, symptomList, saveDisease, deleteDisease, updateDisease, isItUpdateView, setIsSaveBlockViewable}) => {

    const [diseaseName, setDiseaseName] = useState("")
    const [diseaseDescription, setDiseaseDescription] = useState("")
    const [diseaseRiskList, setDiseaseRiskList] = useState([])
    const [diseaseSymptomList, setDiseaseSymptomList] = useState([])

    const [finalSearchRisk, setFinalSearchRisk] = useState("")
    const [finalSearchSymptom, setFinalSearchSymptom] = useState("")

    const [searchRisk, setSearchRisk] = useState("")
    const [searchSymptom, setSearchSymptom] = useState("")

    const resetInputs = () => {
        setDiseaseName("")
        setDiseaseDescription("")
    }
    
    const addOneRisk = (riskName) => {
        if (!riskName) return ErrorAlert("Risk doesn't exist")
        if (diseaseRiskList.includes(riskName)) return ErrorAlert("the disease already has that risk")
        setDiseaseRiskList([...diseaseRiskList,riskName])
    }

    const deleteOneRisk = (riskName) => { 
        setDiseaseRiskList([...diseaseRiskList].filter(risk => risk !== riskName))
    }

    const addOneSymptom = (symptomName) => {
        if (!symptomName) return ErrorAlert("Symptom doens't exist")
        if (diseaseSymptomList.includes(symptomName)) return ErrorAlert("the disease already has that symptom")
        setDiseaseSymptomList([...diseaseSymptomList,symptomName])
    }
    
    const deleteOneSymptom = (symptomName) => { 
        setDiseaseSymptomList([...diseaseSymptomList].filter(symptom => symptom !== symptomName))
    }

    const handleUpdateDisease = (disease_id) => {
        const riskIdArray = riskList.filter(risk => diseaseRiskList.includes(risk.name)).map(riskObj => riskObj._id)
        const symptomIdArray = symptomList.filter(symptom => diseaseSymptomList.includes(symptom.name)).map(symptomObj => symptomObj._id)
        updateDisease(disease_id, diseaseName, diseaseDescription, riskIdArray, symptomIdArray )
    }

    const handleDeleteDisease = (disease_id) => {
        deleteDisease(disease_id)
    }

    const handleSaveDisease = () => {
        const riskIdArray = riskList.filter(risk => diseaseRiskList.includes(risk.name)).map(riskObj => riskObj._id)
        const symptomIdArray = symptomList.filter(symptom => diseaseSymptomList.includes(symptom.name)).map(symptomObj => symptomObj._id)
        saveDisease(diseaseName, diseaseDescription, riskIdArray, symptomIdArray)
        setIsSaveBlockViewable(false)
    }


    useEffect(() => {
        setDiseaseName(disease.name)
        setDiseaseDescription(disease.description)
        setDiseaseRiskList(disease.risks.map(risk => risk.name))
        setDiseaseSymptomList(disease.symptoms.map(symptom => symptom.name))
    }, [])
    

    return (
        <>
            <Box sx={{display:'flex',flexDirection:"column",justifyContent:"space-around"}}>

                <Box sx={{ flexGrow: 1 }}>

                    <Grid container spacing={2}>

                        <Grid item xs={6}>
                            <Typography 
                                variant="p" 
                                sx={{display:"flex",flexDirection: "column",fontSize:"1.2rem",margin:"0.5rem"}}
                            >
                                Name
                            </Typography>
                            <TextField 
                                value={diseaseName} 
                                onChange={e => setDiseaseName(e.target.value)} 
                                sx={{width:'50%',margin:'0.5rem'}}
                            />
                        </Grid>
                            

                        <Grid item xs={6}>
                            <Typography 
                                variant="p" 
                                sx={{display:"flex",flexDirection: "column",fontSize:"1.2rem",margin:"0.5rem"}}
                            >
                                Description
                            </Typography>
                            <TextField 
                                value={diseaseDescription} 
                                onChange={e => setDiseaseDescription(e.target.value)} 
                                sx={{width:'50%',margin:'0.5rem'}}
                            />
                        </Grid>


                        <Grid item xs={6}>
                            <Typography 
                                variant="p" 
                                sx={{display:"flex",flexDirection: "column",fontSize:"1.2rem",margin:"0.5rem"}}
                            >
                                Risks
                            </Typography>
                            <Grid container spacing={2}>
                                <Grid item xs={10}>
                                    <Autocomplete
                                        onChange={(event, value) => setFinalSearchRisk(value)}
                                        options={riskList.map(risk => risk.name)}
                                        renderInput={params => <TextField {...params} value={searchRisk} onChange={e => setSearchRisk(e.target.value)}/> }
                                    />
                                </Grid>
                                <Grid item xs={2} sx={{display:"flex", alignItems:"center"}}>
                                    <SaveIcon fontSize="large" sx={{cursor:"pointer"}} onClick={() => addOneRisk( finalSearchRisk )}/>
                                </Grid>
                            </Grid>
                            

                            <Grid container spacing={2} sx={{my:2,ml:1}}>
                                {
                                    diseaseRiskList.map((risk, id) => <>
                                    <Grid item xs={9} sx={{fontSize:"1.2rem",padding:"0.5rem",borderBottom:""}}>
                                        {risk}
                                    </Grid>
                                    <Grid item xs={3}>
                                        <DeleteIcon sx={{cursor:"pointer"}} fontSize="small" onClick={() => deleteOneRisk(risk)}/>
                                    </Grid>
                                    </>)
                                }
                            </Grid>
                            
                        </Grid>


                        <Grid item xs={6}>
                            <Typography 
                                variant="p" 
                                sx={{display:"flex",flexDirection: "column",fontSize:"1.2rem",margin:"0.5rem"}}
                            >
                                Symptoms
                            </Typography> 
                            <Grid container spacing={2}>
                                <Grid item xs={10}>
                                    <Autocomplete
                                        onChange={(event, value) => setFinalSearchSymptom(value)}
                                        options={symptomList.map(symptom => symptom.name)}
                                        renderInput={params => <TextField {...params} value={searchSymptom} onChange={e => setSearchSymptom(e.target.value)}/> }
                                    />
                                </Grid>
                                <Grid item xs={2} sx={{display:"flex", alignItems:"center"}}>
                                    <SaveIcon sx={{cursor:"pointer"}} fontSize="large" onClick={() => addOneSymptom( finalSearchSymptom )}/>
                                </Grid>
                            </Grid>   
                            <Grid container spacing={2} sx={{my:2,ml:1}}>
                            
                                {
                                    diseaseSymptomList.map((symptom, id) => <>
                                        <Grid item xs={9} sx={{fontSize:"1.2rem",padding:"0.5rem",borderBottom:""}}>
                                            {symptom}
                                        </Grid>
                                        <Grid item xs={3}>
                                            <DeleteIcon sx={{cursor:"pointer"}} fontSize="small" onClick={() => deleteOneSymptom(symptom)}/>
                                        </Grid>
                                    </>)
                                }
                            </Grid>
                            
                        </Grid>
                    </Grid>
                </Box>
            </Box>


            <Box sx={{display:"flex",flexDirection:"row",justifyContent:"center"}}>
                {
                    isItUpdateView ?
                    <>
                        <Button variant="contained" onClick={() => handleUpdateDisease(disease._id)}>update</Button>
                        <Button variant="contained" onClick={() => handleDeleteDisease(disease._id)}>delete</Button>
                    </>
                    :
                    <>
                        <Button variant="contained" onClick={handleSaveDisease}>save</Button>
                        <Button variant="contained" onClick={()=>setIsSaveBlockViewable(false)}>cancel</Button>
                    </>
                }
            </Box>
        </>
    )
}

export default NewDisease