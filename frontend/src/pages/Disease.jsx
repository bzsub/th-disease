import React, { useEffect, useState } from 'react'

import { todoApi } from "../api/todoApi";

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import NewDisease from '../components/NewDisease';

import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Button from "@mui/material/Button";
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';


const Disease = () => {
    // constant for the alert message
    const DATA_TYPE="Disease"

    const [diseaseList, setDiseaseList] = useState([])

    const [riskList, setRiskList] = useState([])
    const [symptomList, setSymptomList] = useState([])

    const [searchDisease, setSearchDisease] = useState("")

    const [isSaveBlockViewable, setIsSaveBlockViewable] = useState(false)

    const { get, post, del, update } = todoApi();

    const getAllDiseases = async () => {
        const response = await get(`/disease`)
        //adding every disease object a toggleView key
        setDiseaseList(response.data.map(disease => ({...disease, toggleView:false})))
    }

    const getAllRisks = async () => {
        const response = await get(`/risk`)
        setRiskList(response.data)
    }

    const getAllSymptoms = async () => {
        const response = await get(`/symptom`)
        setSymptomList(response.data)
    }

    const saveDisease = async (name, description, risks, symptoms) => {
        const response = await post(`/disease`, {name, description, risks, symptoms}, DATA_TYPE)
        if (response.status === 200) getAllDiseases()
    } 
    
    const deleteDisease = async (disease_id) => {
        console.log(disease_id);
        const response = await del(`/disease/${disease_id}`, DATA_TYPE)
        if (response.status === 200) getAllDiseases()
    }

    const updateDisease = async (disease_id, name, description, risks, symptoms) => {
        const response = await update(`/disease/${disease_id}`,{name, description, risks, symptoms}, DATA_TYPE)
        if (response.status === 200) getAllDiseases()
    }
    

    const toggleView = (name, toggleView) => {  
        setDiseaseList(old => 
            old.map(disease => {
                if (disease.name === name) {
                    return {...disease,toggleView:!toggleView}
                }
                return disease
            })
        )
    }

    useEffect(() => {
        getAllDiseases()
        getAllRisks()
        getAllSymptoms()
    //eslint-disable-next-line
    }, [])
    

    return (
        <Container sx={{padding:"8rem 0 0",height:"100vh",minWidth:"100vw", backgroundColor:"#f0f2f5"}}>

            <Typography variant="h1" gutterBottom sx={{fontSize:"1.5rem",margin:"0 0 1rem",textAlign:"center"}}>
                    Diseases 
            </Typography>
            <Autocomplete
                onChange={(event, value) => setSearchDisease(value)}
                sx={{margin:"1rem auto 2rem"}}
                options={diseaseList.map(disease => disease.name)}
                renderInput={params => <TextField {...params} label="diseases" value={searchDisease} onChange={e => setSearchDisease(e.target.value)}/> }
            />
        
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="left" sx={{fontWeight:"600"}}>name</TableCell>
                            <TableCell align="left" sx={{fontWeight:"600"}}>description</TableCell>
                            <TableCell align="left" sx={{fontWeight:"600"}}>risk factors</TableCell>
                            <TableCell align="left" sx={{fontWeight:"600"}}>symptoms</TableCell>
                            <TableCell align="left"></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                    {
                        diseaseList && diseaseList.slice(0, 10).filter(disease => disease.name.includes(searchDisease)).map((disease,id) => (
                        <>
                            <TableRow key={id}> 
                                <TableCell align="left" component="th" scope="row">
                                    {disease.name}
                                </TableCell>
                                <TableCell align="left">
                                    {disease.description}
                                </TableCell>
                                <TableCell align="left">
                                    {disease.risks.length} risks
                                </TableCell>
                                <TableCell align="left">
                                    {disease.symptoms.length} symptoms
                                </TableCell>
                                <TableCell align="left">
                                    <Button onClick={() => toggleView(disease.name, disease.toggleView)}>                                 
                                        Edit
                                    </Button>
                                </TableCell>   
                            </TableRow> 
                            {disease.toggleView && <TableRow key={id+"toggle"} sx={{height:'200px'}}> 
                                <TableCell colSpan="5">
                                    <NewDisease 
                                        disease={disease} 
                                        riskList={riskList} 
                                        symptomList={symptomList}
                                        saveDisease={saveDisease}
                                        deleteDisease={deleteDisease} 
                                        updateDisease={updateDisease}
                                        isItUpdate={true}
                                    />
                                </TableCell>                   
                            </TableRow>} 
                        </>                      
                    ))}

                    <TableRow key={"diseaseSaveRow"} sx={{height:isSaveBlockViewable ? '200px' : 'auto'}}>
                        {
                            isSaveBlockViewable ? 
                            <TableCell key={"diseaseSaveCell"} colSpan="5">
                                <NewDisease 
                                    disease={{name:"",description:"",risks:[], symptoms:[]}} 
                                    riskList={riskList} 
                                    symptomList={symptomList}
                                    saveDisease={saveDisease}
                                    deleteDisease={deleteDisease} 
                                    updateDisease={updateDisease}
                                    isItUpdate={false}
                                    setIsSaveBlockViewable={setIsSaveBlockViewable}
                                />
                            </TableCell>
                            :
                            <>
                                <TableCell key={"diseaseSaveCell"} colSpan="4"></TableCell>
                                <TableCell key={"diseaseSaveCell"} onClick={()=>setIsSaveBlockViewable(true)}>
                                    <Button>New</Button>
                                </TableCell>
                            </> 
                        }
                    </TableRow>
                    
                    
                    
                                     
                    </TableBody>
                </Table>
            </TableContainer>
            
           

            <ToastContainer
                position="bottom-center"
                autoClose={2000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
        </Container>
    )
}

export default Disease