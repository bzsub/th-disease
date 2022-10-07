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


import Pagination from '../components/tableComponents/Pagination';

import Loading from "../components/LoadingMask";
import Dialog from '../components/Dialog'
import { useAuth } from '../providers/auth';
import SearchBar from "../components/SearchBar"


const Symptom = () => {
    // constant for the alert message
    const dataType="Symptom"

    const [symptomList, setSymptomList] = useState([])
    const [search, setSearch] = useState("")

    // a toggle, either userId (in case of update) or null (in case of save)
    const [inputId, setInputId] = useState(null)

    const [inputName, setInputName] = useState("")
    const [inputDescription, setInputDescription] = useState("")

    const [page, setPage] = useState(0)
    const [rowsPerPage, setRowsPerPage] = useState(5)

    const [isLoading, setIsLoading] = useState(false)

    const { get, post, del, update } = todoApi();

    const { user } = useAuth();


    const getAllSymptoms = async () => {
        setIsLoading(true)
        const response = await get(`/symptom`)
        setIsLoading(false)
        setSymptomList(response.data)
    }

    const saveNewSymptom = async () => {
        const response = await post(`/symptom`, {name:inputName,description:inputDescription}, dataType)
        if (response.status === 200) {
            getAllSymptoms()
            resetInputs()
        }
    } 
    
    const deleteSymptomById = async (symptom_id) => {
        const response = await del(`/symptom/${symptom_id}`, dataType)
        if (response.status === 200) getAllSymptoms()
    }

    const updateSymptom = async () => { 
        const response = await update(`/symptom/${inputId}`, {name:inputName, description: inputDescription}, dataType)
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

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
      };
    
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    useEffect(() => {
        getAllSymptoms()
    //eslint-disable-next-line
    }, [])
    

    return (
        <Container sx={{maxWidth:"1200px",padding:"8rem 0"}}>

            <Loading isLoading={isLoading}/>

            <Typography variant="h1" sx={{fontSize:"3rem",textAlign:"center"}}>
                    Symptoms 
            </Typography>

            <SearchBar 
                labelText="symptom"
                list={symptomList} 
                search={search}
                setSearch={setSearch}
            />
        
            <TableContainer component={Paper} sx={{marginTop:"3rem"}}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <Head list={["name","description","",""]}/>
                    <TableBody>
                    {symptomList && symptomList.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).filter(symptom => symptom.name.includes(search)).map((symptom,id) => (
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
                                <TableCell align="center">
                                    <TextField value={inputDescription} onChange={e => setInputDescription(e.target.value)}/>
                                </TableCell>
                                
                                <TableCell align="center" sx={{width:"1rem"}}>
                                    {user &&<Button variant="outlined" onClick={updateSymptom}>save</Button>}
                                </TableCell>
                                <TableCell align="center" sx={{width:"1rem"}}>
                                    {user &&<Button variant="outlined" onClick={resetInputs}>cancel</Button>}
                                </TableCell>
                                   
                                
                            </> :
                            <>
                                <TableCell align="center">
                                    {symptom.name}
                                </TableCell>
                                <TableCell align="center">
                                    {symptom.description}
                                </TableCell>
                                
                                <TableCell align="center" sx={{width:"1rem"}}>
                                    {user &&<Button variant="outlined" onClick={() => startInputs(symptom)} disabled={inputId}>edit</Button>}
                                </TableCell>
                                <TableCell align="center" sx={{width:"1rem"}}>
                                    {user &&<Dialog buttonText={"delete"} alertText={"Are you sure you want to delete this symptom?"} onAccept={() => deleteSymptomById(symptom._id)}/>}
                                </TableCell>
                            
                                
                            </>
                        }
                        
                        </TableRow>
                    ))}
                    <Pagination 
                        diseaseList={symptomList} 
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
                                <Button variant="outlined" onClick={saveNewSymptom}>save</Button>
                            </TableCell>
                        </TableRow>
                    }                           
                    </TableBody>
                </Table>
            </TableContainer>

        </Container>
    )
}

export default Symptom