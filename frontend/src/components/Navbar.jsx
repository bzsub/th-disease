import React from 'react'
import AppBar from '@mui/material/AppBar';
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";


const Navbar = () => {
    const navigate = useNavigate();

    return (
        <AppBar position="fixed" style={{
            background:"#fff",
            padding:"10px",
            left:"0",
            right:"0",
            top:"0",
            height:"80px",
            zIndex:"5",
            display:"flex",
            flexDirection:"row"
            }}
        >
            <Button onClick={() => navigate("/disease")}>disease</Button>
            <Button onClick={() => navigate("/risk")}>risk</Button>
            <Button onClick={() => navigate("/symptom")}>symptom</Button>

        </AppBar>
    )
}

export default Navbar