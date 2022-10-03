import React, { useEffect, useState } from 'react'

import { todoApi } from "../api/todoApi";

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


import NewDisease from '../components/NewDisease';

import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Button from "@mui/material/Button";
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import AddIcon from '@mui/icons-material/Add';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

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
        <Container 
            className="container" 
            sx={{maxWidth:"1200px",padding:"8rem 0"}}
        >
            <Typography 
                variant="h1" 
                sx={{fontSize:"3rem",textAlign:"center"}}
            >
                    Diseases 
            </Typography>

            <Autocomplete
                onChange={(event, value) => setSearchDisease(value)}
                sx={{width:"50%",margin:"3rem auto 0"}}
                options={diseaseList.map(disease => disease.name)}
                renderInput={params => 
                    <TextField 
                        {...params} 
                        label="search for a disease" 
                        value={searchDisease} 
                        onChange={e => setSearchDisease(e.target.value)}
                    /> 
                }
            />
        
            <TableContainer component={Paper} sx={{marginTop:"3rem"}}>
                <Table aria-label="simple table">

                    <TableHead>
                        <TableRow>
                            <TableCell sx={{textTransform: "uppercase",borderBottom:"2px solid black",fontSize:"1.2rem",fontWeight:"600",textAlign:"center"}}>name</TableCell>
                            <TableCell sx={{textTransform: "uppercase",borderBottom:"2px solid black",fontSize:"1.2rem",fontWeight:"600",textAlign:"center"}}>description</TableCell>
                            <TableCell sx={{textTransform: "uppercase",borderBottom:"2px solid black",fontSize:"1.2rem",fontWeight:"600",textAlign:"center"}}>risk factors</TableCell>
                            <TableCell sx={{textTransform: "uppercase",borderBottom:"2px solid black",fontSize:"1.2rem",fontWeight:"600",textAlign:"center"}}>symptoms</TableCell>
                            <TableCell sx={{borderBottom:"2px solid black",width:"3rem",textAlign:"center"}}></TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {
                            diseaseList && diseaseList.slice(0, 10).filter(disease => disease.name.includes(searchDisease)).map((disease,id) => 
                            <React.Fragment key={id}>
                                <TableRow key={id}> 
                                    <TableCell align="center">
                                        {disease.name}
                                    </TableCell>
                                    <TableCell align="center">
                                        {disease.description}
                                    </TableCell>
                                    <TableCell align="center">
                                        {disease.risks.length} risks
                                    </TableCell>
                                    <TableCell align="center">
                                        {disease.symptoms.length} symptoms
                                    </TableCell>
                                    <TableCell align="center">
                                        <Button onClick={() => toggleView(disease.name, disease.toggleView)}>                                 
                                            {
                                                disease.toggleView ?
                                                <KeyboardArrowUpIcon/>
                                                :
                                                <KeyboardArrowDownIcon/>
                                            }
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
                                            isItUpdateView={true}
                                        />
                                    </TableCell>                   
                                </TableRow>} 
                            </React.Fragment>                      
                        )}

                        <TableRow sx={{height:isSaveBlockViewable ? '200px' : 'auto'}}>
                            {
                                isSaveBlockViewable ? 
                                <TableCell colSpan="5">
                                    <NewDisease 
                                        disease={{name:"",description:"",risks:[], symptoms:[]}} 
                                        riskList={riskList} 
                                        symptomList={symptomList}
                                        saveDisease={saveDisease}
                                        deleteDisease={deleteDisease} 
                                        updateDisease={updateDisease}
                                        isItUpdateView={false}
                                        setIsSaveBlockViewable={setIsSaveBlockViewable}
                                    />
                                </TableCell>
                                : 
                                <TableCell colSpan="5" sx={{textAlign:"center"}} onClick={()=>setIsSaveBlockViewable(true)}>
                                    <AddIcon sx={{fontSize:"3rem",border:"3px solid black", borderRadius:"50%"}}/>
                                </TableCell>
                            
                            }
                        </TableRow>   
                    </TableBody>
                </Table>
            </TableContainer>
            
                            
            <ToastContainer
                position="top-center"
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