import React, { useEffect, useState } from 'react'

import { todoApi } from "../api/todoApi";

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Button from "@mui/material/Button";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import AddIcon from '@mui/icons-material/Add';

import Dialog from '../components/Dialog'



const Symptom = () => {
    // constant for the alert message
    const DATA_TYPE="Symptom"

    const [symptomList, setSymptomList] = useState([])
    const [search, setSearch] = useState("")

    // a toggle, either userId (in case of update) or null (in case of save)
    const [inputId, setInputId] = useState(null)

    const [inputName, setInputName] = useState("")
    const [inputDescription, setInputDescription] = useState("")

    const { get, post, del, update } = todoApi();

    const getAllSymptoms = async () => {
        const response = await get(`/symptom`)
        setSymptomList(response.data)
    }

    const saveNewSymptom = async () => {
        const response = await post(`/symptom`, {name:inputName,description:inputDescription}, DATA_TYPE)
        if (response.status === 200) {
            getAllSymptoms()
            resetInputs()
        }
    } 
    
    const deleteSymptomById = async (symptom_id) => {
        const response = await del(`/symptom/${symptom_id}`, DATA_TYPE)
        if (response.status === 200) getAllSymptoms()
    }

    const updateSymptom = async () => { 
        const response = await update(`/symptom/${inputId}`, {name:inputName, description: inputDescription}, DATA_TYPE)
        if (response.status === 200) {
            resetInputs()
            getAllSymptoms()
        }
    }

    // At the start of update puts the old symptom's name and description into the input fields
    const startInputs = symptom => {
        setInputId(symptom._id)
        setInputName(symptom.name)
        setInputDescription(symptom.description)
    }

    const resetInputs = () => {
        setInputId("")
        setInputName("")
        setInputDescription("")
    }

    useEffect(() => {
        getAllSymptoms()
    //eslint-disable-next-line
    }, [])
    

    return (
        <Container sx={{maxWidth:"1200px",padding:"8rem 0"}}>

            <Typography variant="h1" sx={{fontSize:"3rem",textAlign:"center"}}>
                    Symptoms 
            </Typography>

            <Autocomplete
                onChange={(event, value) => setSearch(value)}
                sx={{width:"50%",margin:"3rem auto 0"}}
                options={symptomList.map(disease => disease.name)}
                renderInput={params => <TextField {...params} label="search for a symptom" value={search} onChange={e => setSearch(e.target.value)}/> }
            />
        
            <TableContainer component={Paper} sx={{marginTop:"3rem"}}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow >
                            <TableCell sx={{textTransform: "uppercase",borderBottom:"2px solid black",fontSize:"1.2rem",fontWeight:"600",textAlign:"left"}}>name</TableCell>
                            <TableCell sx={{textTransform: "uppercase",borderBottom:"2px solid black",fontSize:"1.2rem",fontWeight:"600",textAlign:"left"}}>description</TableCell>
                            <TableCell sx={{width:"3rem",borderBottom:"2px solid black"}}></TableCell>
                            <TableCell sx={{width:"3rem",borderBottom:"2px solid black"}}></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                    {symptomList && symptomList.slice(0, 10).filter(symptom => symptom.name.includes(search)).map((symptom,id) => (
                        <TableRow
                            key={id}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                        {
                            inputId === symptom._id ? 
                            <>
                                <TableCell component="th" scope="row">
                                    <TextField value={inputName} onChange={e => setInputName(e.target.value)} />
                                </TableCell>
                                <TableCell align="left">
                                    <TextField value={inputDescription} onChange={e => setInputDescription(e.target.value)}/>
                                </TableCell>
                                <TableCell align="left" sx={{width:"1rem"}}>
                                    <Button variant="outlined" onClick={updateSymptom}>save</Button>
                                </TableCell>
                                <TableCell align="left" sx={{width:"1rem"}}>
                                    <Button variant="outlined" onClick={resetInputs}>cancel</Button>
                                </TableCell>
                            </> :
                            <>
                                <TableCell component="th" scope="row">
                                    {symptom.name}
                                </TableCell>
                                <TableCell align="left">
                                    {symptom.description}
                                </TableCell>
                                <TableCell align="left" sx={{width:"1rem"}}>
                                    <Button variant="outlined" onClick={() => startInputs(symptom)} disabled={inputId}>edit</Button>
                                </TableCell>
                                <TableCell align="left" sx={{width:"1rem"}}>
                                    <Dialog buttonText={"delete"} alertText={"Are you sure you want to delete this symptom?"} onAccept={() => deleteSymptomById(symptom._id)}/>
                                </TableCell>
                            </>
                        }
                        
                        </TableRow>
                    ))}
                    { 
                        inputId ? 
                        <TableRow>

                            <TableCell colspan="4" style={{ "text-align": "center" }}>
                                <AddIcon sx={{fontSize:"3rem",border:"3px solid black", borderRadius:"50%"}} onClick={resetInputs}/>
                            </TableCell>
                            
                        </TableRow> 
                        :
                        <TableRow>
                            <TableCell component="th" scope="row">
                                <TextField value={inputName} onChange={e => setInputName(e.target.value)} />
                            </TableCell>
                            <TableCell align="left">
                                <TextField value={inputDescription} onChange={e => setInputDescription(e.target.value)}/>
                            </TableCell>
                            <TableCell align="left" sx={{width:"1rem"}}></TableCell>
                            <TableCell align="left" sx={{width:"1rem"}}>
                                <Button variant="outlined" onClick={saveNewSymptom}>save</Button>
                            </TableCell>
                        </TableRow>
                    }                           
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

export default Symptom