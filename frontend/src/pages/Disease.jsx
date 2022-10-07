import React, { useEffect, useState } from 'react'

import { todoApi } from "../api/todoApi";

import ToggleRow from '../components/tableComponents/ToggleRow';
import Loading from "../components/LoadingMask";
import Head from "../components/tableComponents/Head"
import SearchBar from '../components/SearchBar';
import Row from '../components/tableComponents/Row';
import Pagination from '../components/tableComponents/Pagination';
import { useAuth } from '../providers/auth';

import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import AddIcon from '@mui/icons-material/Add';


const Disease = () => {
    
    // constant for the alert message
    const dataType="Disease"

    const [diseaseList, setDiseaseList] = useState([])
    const [riskList, setRiskList] = useState([])
    const [symptomList, setSymptomList] = useState([])

    const [searchDisease, setSearchDisease] = useState("")

    const [isSaveBlockViewable, setIsSaveBlockViewable] = useState(false)

    const [page, setPage] = useState(0)
    const [rowsPerPage, setRowsPerPage] = useState(5)

    const [isLoading, setIsLoading] = useState(false)

    const { get, post, del, update } = todoApi();

    const { user } = useAuth();

    
    const getAllDiseases = async () => {
        setIsLoading(true)
        const response = await get(`/disease`)
        setIsLoading(false)
        //adding every disease object a toggleView key
        setDiseaseList(response.data.map(disease => ({...disease, toggleView: false})))
    }

    const getAllRisks = async () => {
        setIsLoading(true)
        const response = await get(`/risk`)
        setIsLoading(false)
        setRiskList(response.data)
    }

    const getAllSymptoms = async () => {
        setIsLoading(true)
        const response = await get(`/symptom`)
        setIsLoading(false)
        setSymptomList(response.data)
    }

    const saveDisease = async (name, description, risks, symptoms) => {
        const response = await post(`/disease`, {name, description, risks, symptoms}, dataType)
        if (response.status === 200) getAllDiseases()
    } 
    
    const deleteDisease = async (disease_id) => {
        const response = await del(`/disease/${disease_id}`, dataType)
        if (response.status === 200) getAllDiseases()
    }

    const updateDisease = async (disease_id, name, description, risks, symptoms) => {
        const response = await update(`/disease/${disease_id}`,{name, description, risks, symptoms}, dataType)
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

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
      };
    
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    useEffect(() => {
        getAllDiseases()
        getAllRisks()
        getAllSymptoms()
    //eslint-disable-next-line
    }, [])
    

    return (

        <Container sx={{maxWidth:"1200px",padding:"8rem 0"}}
        >

            <Loading isLoading={isLoading}/>

            <Typography 
                variant="h1" 
                sx={{fontSize:"3rem",textAlign:"center"}}
            >
                Diseases
            </Typography>

            <SearchBar 
                labelText="disease"
                list={diseaseList} 
                search={searchDisease}
                setSearch={setSearchDisease}
            />

            <TableContainer component={Paper} sx={{marginTop:"3rem"}}>

                <Table aria-label="simple table">

                    <Head list={["name","description","risk factors","symptoms",""]}/>

                    <TableBody>
                        {
                            diseaseList && diseaseList
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .filter(disease => disease.name.includes(searchDisease))
                            .map((disease,id) => 
                            <React.Fragment key={id}>

                                <Row 
                                    id={id} 
                                    disease={disease} 
                                    toggleView={toggleView}
                                />

                                {
                                    disease.toggleView && <ToggleRow 
                                        id={id}
                                        disease={disease} 
                                        riskList={riskList} 
                                        symptomList={symptomList}
                                        saveDisease={saveDisease}
                                        deleteDisease={deleteDisease} 
                                        updateDisease={updateDisease}
                                        isItUpdateView={true}
                                    />
                                } 
                            </React.Fragment>                      
                        )}

                        <Pagination 
                            diseaseList={diseaseList} 
                            page={page} 
                            rowsPerPage={rowsPerPage} 
                            handleChangePage={handleChangePage} 
                            handleChangeRowsPerPage={handleChangeRowsPerPage}
                        />

                            
                        {
                            isSaveBlockViewable ? 
                
                            <ToggleRow 
                                disease={{name:"",description:"",risks:[], symptoms:[]}} 
                                riskList={riskList} 
                                symptomList={symptomList}
                                saveDisease={saveDisease}
                                deleteDisease={deleteDisease} 
                                updateDisease={updateDisease}
                                setIsSaveBlockViewable={setIsSaveBlockViewable}
                                isItUpdateView={false}
                            />  
                            : 
                            <>
                                {user && <TableRow sx={{height:'auto'}}>
                                    <TableCell 
                                        colSpan="5" 
                                        sx={{textAlign:"center"}} 
                                        onClick={()=>setIsSaveBlockViewable(true)}>

                                        <AddIcon fontSize="large" sx={{cursor:"pointer"}}/>
                                    </TableCell>
                                </TableRow>}
                            </>
                        }
                    </TableBody>
                </Table>
            </TableContainer>
        </Container>
    )
}


export default Disease