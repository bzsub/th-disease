import React, { useEffect, useState } from 'react'

import { todoApi } from "../api/todoApi";

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Box from '@mui/material/Box';
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



const Risk = () => {
    // constant for the alert message
    const DATA_TYPE="Risk"

    const [riskList, setRiskList] = useState([])
    const [search, setSearch] = useState("")

    // a toggle, either userId (in case of update) or null (in case of save)
    const [inputId, setInputId] = useState(null)

    const [inputName, setInputName] = useState("")
    const [inputDescription, setInputDescription] = useState("")

    const { get, post, del, update } = todoApi();

    const getAllRisks = async () => {
        const response = await get(`/risk`)
        setRiskList(response.data)
    }

    const saveNewRisk = async () => {
        const response = await post(`/risk`, {name:inputName, description:inputDescription}, DATA_TYPE)
        if (response.status === 200) {
            getAllRisks()
            resetInputs()
        }
    } 
    
    const deleteRiskById = async (risk_id) => {
        const response = await del(`/risk/${risk_id}`, DATA_TYPE)
        if (response.status === 200) getAllRisks()
    }

    const updateRisk = async () => { 
        const response = await update(`/risk/${inputId}`, {name:inputName, description:inputDescription}, DATA_TYPE)
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
        <Container sx={{padding:"8rem 0 0",height:"100vh",minWidth:"100vw", backgroundColor:"#f0f2f5"}}>

            <Typography variant="h1" gutterBottom sx={{fontSize:"1.5rem",margin:"0 0 1rem",textAlign:"center"}}>
                    Risks 
            </Typography>

            <Autocomplete
                onChange={(event, value) => setSearch(value)}
                sx={{margin:"1rem auto 2rem"}}
                options={riskList.map(disease => disease.name)}
                renderInput={params => <TextField {...params} label="risks" value={search} onChange={e => setSearch(e.target.value)}/> }
            />
        
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow >
                            <TableCell sx={{fontWeight:"600"}}>name</TableCell>
                            <TableCell align="left" sx={{fontWeight:"600"}}>description</TableCell>
                            <TableCell align="left"></TableCell>
                            <TableCell align="left"></TableCell>
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
                                <TableCell component="th" scope="row">
                                    <TextField value={inputName} onChange={e => setInputName(e.target.value)} />
                                </TableCell>
                                <TableCell align="left">
                                    <TextField value={inputDescription} onChange={e => setInputDescription(e.target.value)}/>
                                </TableCell>
                                <TableCell align="left" sx={{width:"1rem"}}>
                                    <Button onClick={updateRisk}>save</Button>
                                </TableCell>
                                <TableCell align="left" sx={{width:"1rem"}}>
                                    <Button onClick={resetInputs}>cancel</Button>
                                </TableCell>
                            </> :
                            <>
                                <TableCell component="th" scope="row">
                                    {risk.name}
                                </TableCell>
                                <TableCell align="left">
                                    {risk.description}
                                </TableCell>
                                <TableCell align="left" sx={{width:"1rem"}}>
                                    <Button onClick={() => startInputs(risk)} disabled={inputId}>edit</Button>
                                </TableCell>
                                <TableCell align="left" sx={{width:"1rem"}}>
                                    <Button onClick={() => deleteRiskById(risk._id)}>delete</Button>
                                </TableCell>
                            </>
                        }
                        
                        </TableRow>
                    ))}
                    { 
                        inputId ? 
                        <TableRow>

                            <TableCell colspan="4" style={{ "text-align": "center" }}>
                                <Button onClick={resetInputs}>add</Button>
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
                                <Button onClick={saveNewRisk}>save</Button>
                            </TableCell>
                        </TableRow>
                    }                           
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

export default Risk