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
import Head from "../components/tableComponents/Head"
import { SuccessfulAlert, ErrorAlert } from "../utils/AlertMessages"



import Pagination from '../components/tableComponents/Pagination';

import Loading from "../components/LoadingMask";
import Dialog from '../components/Dialog'
import { useAuth } from '../providers/auth';

import SearchBar from "../components/SearchBar"

const Risk = () => {
    // constant for the alert message
    const dataType="Risk"

    const [riskList, setRiskList] = useState([])
    const [search, setSearch] = useState("")

    // toggle between userId (in case of update) and null (in case of save)
    const [inputId, setInputId] = useState(null)

    const [inputName, setInputName] = useState("")
    const [inputDescription, setInputDescription] = useState("")

    const [page, setPage] = useState(0)
    const [rowsPerPage, setRowsPerPage] = useState(5)

    const [isLoading, setIsLoading] = useState(false)

    const { get, post, del, update } = todoApi();

    const { user } = useAuth();


    const getAllRisks = async () => {
        setIsLoading(true)
        const response = await get(`/risk`)
        setIsLoading(false)
        setRiskList(response.data)
    }

    const saveNewRisk = async () => {
        // if (inputName.length < 4) return ErrorAlert("Risk name is too short")
        // if (inputDescription.length < 4) return ErrorAlert("Risk description is too short")
        const response = await post(`/risk`, {name:inputName, description:inputDescription}, dataType)
        if (response.status === 200) {
            getAllRisks()
            resetInputs()
        }
    } 
    
    const deleteRiskById = async (risk_id) => {
        const response = await del(`/risk/${risk_id}`, dataType)
        if (response.status === 200) getAllRisks()
    }

    const updateRisk = async () => { 
        // if (inputName.length < 4) return ErrorAlert("Risk name is too short")
        // if (inputDescription.length < 4) return ErrorAlert("Risk description is too short")
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

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
      };
    
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

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

            <SearchBar 
                labelText="risk"
                list={riskList} 
                search={search}
                setSearch={setSearch}
            />
        
            <TableContainer component={Paper} sx={{marginTop:"3rem"}}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <Head list={["name","description","",""]}/>
                    <TableBody>
                    {riskList && riskList.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).filter(risk => risk.name.includes(search)).map((risk,id) => (
                        <TableRow
                            key={id}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                        {
                            inputId === risk._id ? 
                            <>
                                <TableCell align="center">
                                    <TextField value={inputName} onChange={e => setInputName(e.target.value)} />
                                </TableCell>
                                <TableCell align="center">
                                    <TextField value={inputDescription} onChange={e => setInputDescription(e.target.value)}/>
                                </TableCell>
                                <TableCell align="center" sx={{width:"1rem"}}>
                                    {user && <Button variant="outlined" onClick={updateRisk}>save</Button>}
                                </TableCell>
                                <TableCell align="center" sx={{width:"1rem"}}>
                                    {user &&<Button variant="outlined" onClick={resetInputs}>cancel</Button>}
                                </TableCell>
                            </> :
                            <>
                                <TableCell align="center">
                                    {risk.name}
                                </TableCell>
                                <TableCell align="center">
                                    {risk.description}
                                </TableCell>
                                <TableCell align="center" sx={{width:"1rem"}}>
                                    { user && <Button variant="outlined" onClick={() => startInputs(risk)} disabled={inputId}>edit</Button>}
                                </TableCell>
                                <TableCell align="center" sx={{width:"1rem"}}>
                                    { user && <Dialog buttonText={"delete"} alertText={"Are you sure you want to delete this symptom?"} onAccept={() => deleteRiskById(risk._id)}/>}
                                </TableCell>
                            </>
                        }
                        
                        </TableRow>
                    ))}
                    <Pagination 
                            diseaseList={riskList} 
                            page={page} 
                            rowsPerPage={rowsPerPage} 
                            handleChangePage={handleChangePage} 
                            handleChangeRowsPerPage={handleChangeRowsPerPage}
                        />
                    { 
                        !user ? 
                        <>
                        </>
                        :
                        inputId ? 
                        <TableRow>

                            <TableCell colSpan="4" style={{ "text-align": "center" }}>
                                <AddIcon sx={{fontSize:"3rem"}} onClick={resetInputs}/>
                            </TableCell>
                            
                        </TableRow> 
                        :
                        <TableRow>
                            <TableCell align="center">
                                <TextField value={inputName} onChange={e => setInputName(e.target.value)} />
                            </TableCell>
                            <TableCell align="center">
                                <TextField value={inputDescription} onChange={e => setInputDescription(e.target.value)}/>
                            </TableCell>
                            <TableCell align="center" sx={{width:"1rem"}}></TableCell>
                            <TableCell align="center" sx={{width:"1rem"}}>
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