import React, { useEffect, useState } from 'react'
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Button from "@mui/material/Button";
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

const NewDisease = ({disease, riskList, symptomList, saveDisease, deleteDisease, updateDisease, isItUpdate, setIsSaveBlockViewable}) => {

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
        if (!riskName || diseaseRiskList.includes(riskName)) return;
        setDiseaseRiskList([...diseaseRiskList,riskName])
    }

    const deleteOneRisk = (riskName) => { 
        setDiseaseRiskList([...diseaseRiskList].filter(risk => risk !== riskName))
    }

    const addOneSymptom = (symptomName) => {
        if (!symptomName || diseaseSymptomList.includes(symptomName)) return;
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
        saveDisease(diseaseName, diseaseDescription, riskIdArray, symptomIdArray )
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

                <Box sx={{display:"flex",flexDirection:"row",justifyContent:"center"}}>

                    <TextField 
                        label="Name" 
                        value={diseaseName} 
                        onChange={e => setDiseaseName(e.target.value)} 
                        sx={{width:'50%',margin:'0.5rem'}}
                    />

                    <TextField 
                        label="Description" 
                        value={diseaseDescription} 
                        onChange={e => setDiseaseDescription(e.target.value)} 
                        sx={{width:'50%',margin:'0.5rem'}}
                    />

                </Box>

                <Box sx={{display:"flex",flexDirection:"row",justifyContent:"center"}}>

                    <Box sx={{minWidth:"200px"}} >

                        <Typography 
                            variant="p" 
                            sx={{display:"flex",flexDirection: "column",fontSize:"1.5rem",margin:"0.5rem"}}
                        >
                            Risks: 
                        </Typography>

                        {
                            diseaseRiskList.map((risk, id) => <Typography variant="p" sx={{fontSize:"1.5rem",padding:"0.8rem"}} key={id}>
                                {risk}
                                <Button onClick={() => deleteOneRisk(risk)}>X</Button>
                            </Typography>)
                        }

                        <Autocomplete
                            onChange={(event, value) => setFinalSearchRisk(value)}
                            sx={{width:'100%',margin:'0.5rem'}}
                            options={riskList.map(risk => risk.name)}
                            renderInput={params => <TextField {...params} label="risks" value={searchRisk} onChange={e => setSearchRisk(e.target.value)}/> }
                        />
                        <Button onClick={() => addOneRisk( finalSearchRisk )} sx={{display:"block"}}>add risk</Button>
                    </Box>

                    <Box sx={{minWidth:"200px"}}>
                        <Typography variant="p" sx={{display:"flex",flexDirection: "column",fontSize:"1.5rem",margin:"0.5rem"}}>
                            Symptoms: 
                        </Typography>    
                        {
                            diseaseSymptomList.map((symptom, id) => <Typography variant="p" sx={{fontSize:"1.5rem",padding:"0.8rem"}} key={id}>
                                {symptom}
                                <Button onClick={() => deleteOneSymptom(symptom)}>X</Button>
                            </Typography>)
                        }
                        <Autocomplete
                            onChange={(event, value) => setFinalSearchSymptom(value)}
                            sx={{width:'100%',margin:'0.5rem'}}
                            options={symptomList.map(symptom => symptom.name)}
                            renderInput={params => <TextField {...params} label="risks" value={searchSymptom} onChange={e => setSearchSymptom(e.target.value)}/> }
                        />
                        <Button onClick={() => addOneSymptom(finalSearchSymptom)} sx={{display:"block"}}>add symptom</Button>

                    </Box>
                </Box>

            </Box>
            <Box sx={{display:"flex",flexDirection:"row",justifyContent:"center"}}>
                {
                    isItUpdate ?
                    <>
                        <Button onClick={() => handleUpdateDisease(disease._id)}>update</Button>
                        <Button onClick={() => handleDeleteDisease(disease._id)}>delete</Button>
                    </>
                    :
                    <>
                        <Button onClick={handleSaveDisease}>save</Button>
                        <Button onClick={()=>setIsSaveBlockViewable(false)}>cancel</Button>
                    </>
                }
            </Box>
        </>
    )
}

export default NewDisease