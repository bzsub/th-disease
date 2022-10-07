import React from 'react'
import Typography from '@mui/material/Typography';
import Button from "@mui/material/Button";
import Box from '@mui/material/Box';
import { useNavigate } from "react-router-dom";


const Home = () => {

    const navigate = useNavigate();

    const styleMain = {
        fontFamily: 'monospace',
        fontWeight: 700,
        fontSize:"3.5rem",
        textAlign:"center",
        margin:"8rem auto",
        letterSpacing: '.3rem',
        color: '#1976d2',
        textDecoration: 'none',
    }

    const styleSecondary = {
        ...styleMain,
        width:"80%",
        fontSize:"2rem"
    }

    const styleButton = {
        fontSize:"2rem",
        margin:"1rem"
    }

    const styleBox = {
        display:"flex",
        flexDirection:"row",
        justifyContent:"center"
    }

    return (
        <>
            <Typography
            variant="h1"
            style={styleMain}
          >
            ANCESTRALIZE
          </Typography>

          <Typography
            variant="h1"
            style={styleSecondary}
          >
            Help us match risks and symptoms to diseases.
          </Typography>

          <Box style={styleBox}>
            <Button variant="outlined" style={styleButton} onClick={()=>navigate("/login")}>login</Button>
            <Button variant="outlined" style={styleButton} onClick={()=>navigate("/signup")}>signup</Button>
          </Box>
        </>

    )
}

export default Home