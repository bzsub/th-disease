import React from 'react'
import AppBar from '@mui/material/AppBar';
import { useNavigate } from "react-router-dom";

import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';


const Navbar = () => {
    const navigate = useNavigate();
    return (
        <AppBar style={{
            padding:"10px",
            position:"fixed",
            left:"0",
            right:"0",
            top:"0",
            zIndex:"5",
            display:"flex",
            flexDirection:"row"
        }}>
            
            <Button sx={{color:'white'}} onClick={() => navigate("/disease")}>disease</Button>
            <Button sx={{color:'white'}} onClick={() => navigate("/risk")}>risk</Button>
            <Button sx={{color:'white'}} onClick={() => navigate("/symptom")}>symptom</Button>
        
        </AppBar>
    )
}

export default Navbar