import React from 'react'
import AppBar from '@mui/material/AppBar';
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import { useAuth } from '../providers/auth';
import { SuccessfulAlert } from "../utils/AlertMessages"
import Typography from '@mui/material/Typography';


const Navbar = () => {
    const navigate = useNavigate();
    const { logout, user } = useAuth();

    return (
        <AppBar 
            style={{
                background:"#fff",
                position:"fixed", 
                padding:"10px",
                left:"0",
                right:"0",
                top:"0",
                height:"80px",
                zIndex:"1",
                display:"flex",
                flexDirection:"row"
            }}
        >
            <Button onClick={() => navigate("/diseases")}>diseases</Button>
            <Button onClick={() => navigate("/risks")}>risks</Button>
            <Button onClick={() => navigate("/symptoms")}>symptoms</Button>
            {
                user ? 
                <>
                    <Button onClick={()=>{SuccessfulAlert("You logged out");navigate("/");logout()}}>logout</Button>
                    <Button sx={{marginLeft:"auto"}} onClick={() => navigate("/login")}>Welcome, {user.data.toString()}</Button>

                </>
                :
                <>
                    <Button onClick={() => navigate("/login")}>login</Button>
                    <Button onClick={() => navigate("/signup")}>sign up</Button>
                </>
            }
        </AppBar>
    )
}

export default Navbar