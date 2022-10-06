import React, { useEffect, useState } from 'react'

import { todoApi } from "../api/todoApi";

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

import Loading from "../components/LoadingMask";
import Dialog from '../components/Dialog'



const Risk = () => {
    // constant for the alert message
    const dataType="Risk"

    const [riskList, setRiskList] = useState([])
    const [search, setSearch] = useState("")

    // toggle between userId (in case of update) and null (in case of save)
    const [inputId, setInputId] = useState(null)

    const [inputName, setInputName] = useState("")
    const [inputDescription, setInputDescription] = useState("")

    const [isLoading, setIsLoading] = useState(false)

    const { get, post, del, update } = todoApi();


    const getAllRisks = async () => {
        setIsLoading(true)
        const response = await get(`/risk`)
        setIsLoading(false)
        setRiskList(response.data)
    }

    const saveNewRisk = async () => {
        const response = await post(`/risk`, {name:inputName, description:inputDescription}, dataType)
        if (response.status === 200) {
            getAllRisks()
            resetInputs()
        }
    } 
    
    const deleteRiskById = async (risk_id) => {
        const response = await del(`/risk/${risk_id}`, 'deleted succesfuly', 'oops..something went wrong')
        if (response.status === 200) getAllRisks()
    }

    const updateRisk = async () => { 
        const response = await update(`/risk/${inputId}`, {name:inputName, description:inputDescription}, dataType)
        if (response.status === 200) {
            resetInputs()
            getAllRisks()
        }
    }

    // At the start of update puts the old risk's name and description into the input fields
    const startInputs = risk => {
        setInputId(risk._id)
        setInputName(risk.name)
        setInputDescription(risk.description)
    }

    const resetInputs = () => {
        setInputId("")
        setInputName("")
        setInputDescription("")
    }

    useEffect(() => {
        getAllRisks()
    //eslint-disable-next-line
    }, [])
    

    return (
        <Container sx={{maxWidth:"1200px",padding:"8rem 0"}}>

            <Loading isLoading={isLoading}/>

            <Typography variant="h1" sx={{fontSize:"3rem",textAlign:"center"}}>
                    Risks 
            </Typography>

            <Autocomplete
                onChange={(event, value) => setSearch(value)}
                sx={{width:"50%",margin:"3rem auto 0"}}
                options={riskList.map(disease => disease.name)}
                renderInput={params => <TextField {...params} label="search for a risk" value={search} onChange={e => setSearch(e.target.value)}/> }
            />
        
            <TableContainer component={Paper} sx={{marginTop:"3rem"}}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell sx={{textTransform: "uppercase",borderBottom:"2px solid black",fontSize:"1.2rem",fontWeight:"600",textAlign:"left"}}>name</TableCell>
                            <TableCell sx={{textTransform: "uppercase",borderBottom:"2px solid black",fontSize:"1.2rem",fontWeight:"600",textAlign:"left"}}>description</TableCell>
                            <TableCell sx={{width:"3rem",borderBottom:"2px solid black"}}></TableCell>
                            <TableCell sx={{width:"3rem",borderBottom:"2px solid black"}}></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                    {riskList && riskList.slice(0, 10).filter(risk => risk.name.includes(search)).map((risk,id) => (
                        <TableRow
                            key={id}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                        {
                            inputId === risk._id ? 
                            <>
                                <TableCell align="left">
                                    <TextField value={inputName} onChange={e => setInputName(e.target.value)} />
                                </TableCell>
                                <TableCell align="left">
                                    <TextField value={inputDescription} onChange={e => setInputDescription(e.target.value)}/>
                                </TableCell>
                                <TableCell align="left" sx={{width:"1rem"}}>
                                    <Button variant="outlined" onClick={updateRisk}>save</Button>
                                </TableCell>
                                <TableCell align="left" sx={{width:"1rem"}}>
                                    <Button variant="outlined" onClick={resetInputs}>cancel</Button>
                                </TableCell>
                            </> :
                            <>
                                <TableCell align="left">
                                    {risk.name}
                                </TableCell>
                                <TableCell align="left">
                                    {risk.description}
                                </TableCell>
                                <TableCell align="left" sx={{width:"1rem"}}>
                                    <Button variant="outlined" onClick={() => startInputs(risk)} disabled={inputId}>edit</Button>
                                </TableCell>
                                <TableCell align="left" sx={{width:"1rem"}}>
                                    <Dialog buttonText={"delete"} alertText={"Are you sure you want to delete this symptom?"} onAccept={() => deleteRiskById(risk._id)}/>
                                </TableCell>
                            </>
                        }
                        
                        </TableRow>
                    ))}
                    { 
                        inputId ? 
                        <TableRow>

                            <TableCell colSpan="4" style={{ "text-align": "center" }}>
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
                                <Button variant="outlined" onClick={saveNewRisk}>save</Button>
                            </TableCell>
                        </TableRow>
                    }                           
                    </TableBody>
                </Table>
            </TableContainer>

        </Container>
    )
}

export default Risk