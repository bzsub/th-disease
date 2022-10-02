import React, { useEffect, useState } from 'react'

import { todoApi } from "../api/todoApi";


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
    const [riskList, setRiskList] = useState([])
    const [search, setSearch] = useState("")

    const [newRiskName, setNewRiskName] = useState("")
    const [newRiskDescription, setNewRiskDescription] = useState("")

    const [editingRiskId, setEditingRiskId] = useState(false)
    const [editingRiskName, setEditingRiskName] = useState("")
    const [editingRiskDescription, setEditingRiskDescription] = useState("")

    const { get, post, del, update } = todoApi();

    const getAllRisks = async () => {
        const response = await get(`/risk`)
        console.log(response.data);
        setRiskList(response.data)
    }

    const saveNewRisk = async () => {
        const response = await post(`/risk`,{name:newRiskName,description:newRiskDescription})
        getAllRisks()
        setNewRiskName("")
        setNewRiskDescription("")
    } 
    
    const deleteRiskById = async (risk_id) => {
        console.log("del",risk_id);
        const response = await del(`/risk/${risk_id}`)
        console.log(response.data)
        getAllRisks()
    }

    const startEditMode = (id,name,description) => {
        console.log(id,name,description);
        setEditingRiskId(id)
        setEditingRiskName(name)
        setEditingRiskDescription(description)
    }

    const cancelEditMode = () => {
        setEditingRiskId("")
        setEditingRiskName("")
        setEditingRiskDescription("")
    }

    const updateRisk = async () => { 
        console.log("update",{name:editingRiskName, description: editingRiskDescription});
        const response = await update(`/risk/${editingRiskId}`,{name:editingRiskName, description: editingRiskDescription})
        console.log(response.data)
        cancelEditMode()
        getAllRisks()
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
            <p>search: {search}</p>
            <Autocomplete
                onChange={(event, value) => setSearch(value)}
                sx={{margin:"1rem auto 2rem"}}
                options={riskList.map(disease => disease.name)}
                renderInput={params => <TextField {...params} label="risks" value={search} onChange={e => setSearch(e.target.value)}/> }
            />
        
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                {/* <caption sx={{textAlign:"center !important"}}><Button>+</Button></caption> */}
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
                            editingRiskId === risk._id ? 
                            <>
                                <TableCell component="th" scope="row">
                                    <TextField value={editingRiskName} onChange={e => setEditingRiskName(e.target.value)} />
                                </TableCell>
                                <TableCell align="left">
                                    <TextField value={editingRiskDescription} onChange={e => setEditingRiskDescription(e.target.value)}/>
                                </TableCell>
                                <TableCell align="left" sx={{width:"20px"}}>
                                    <Button onClick={updateRisk}>save</Button>
                                </TableCell>
                                <TableCell align="left" sx={{width:"20px"}}>
                                    <Button onClick={cancelEditMode}>cancel</Button>
                                </TableCell>
                            </> :
                            <>
                                <TableCell component="th" scope="row">
                                    {risk.name}
                                </TableCell>
                                <TableCell align="left">
                                    {risk.description}
                                </TableCell>
                                <TableCell align="left" sx={{width:"20px"}}>
                                    <Button onClick={()=>startEditMode(risk._id,risk.name,risk.description)} disabled={editingRiskId}>edit</Button>
                                </TableCell>
                                <TableCell align="left" sx={{width:"20px"}}>
                                    <Button onClick={() => deleteRiskById(risk._id)}>delete</Button>
                                </TableCell>
                            </>
                        }
                        
                        </TableRow>
                    ))}
                        
                        <TableRow
                            key={"newRisk"}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                            <TableCell component="th" scope="row">
                                <TextField value={newRiskName} onChange={e => setNewRiskName(e.target.value)} />
                            </TableCell>
                            <TableCell align="left">
                                <TextField value={newRiskDescription} onChange={e => setNewRiskDescription(e.target.value)}/>
                            </TableCell>
                            <TableCell align="left" sx={{width:"20px"}}></TableCell>
                            <TableCell align="left" sx={{width:"20px"}}>
                                <Button onClick={saveNewRisk}>save</Button>
                            </TableCell>
                        </TableRow>
                        
                    </TableBody>
                </Table>
            </TableContainer>
        </Container>
    )
}

export default Risk