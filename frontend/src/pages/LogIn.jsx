import React, { useEffect, useState } from 'react'
import { Link } from "react-router-dom";
import { useAuth } from "../providers/auth";
import { useNavigate } from "react-router-dom";

import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';


export default function LogIn() {

    // constant for the alert message
    const dataType="login"

    const navigate = useNavigate();
    
    const { login, user } = useAuth();

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    useEffect(() => {
        if (user?.data) navigate("/diseases")
        // eslint-disable-next-line
    },[user])

    return (

        <Container component="main" maxWidth="xs">
            
            <Grid container spacing={2} sx={{mt:20}}>

                <Grid item xs={12}>
                    <Typography 
                        component="h1" 
                        variant="h4" 
                        sx={{textAlign:"center",mb:3}}
                    >
                        Log In
                    </Typography>
                </Grid>

                <Grid item xs={12}>
                    <TextField
                        fullWidth
                        label="Email Address"
                        autoComplete="email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                </Grid>

                <Grid item xs={12}>
                    <TextField
                        fullWidth
                        label="Password"
                        type="password"
                        autoComplete="new-password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                    />
                </Grid>

                <Grid item xs={12}>
                    <Button
                        fullWidth
                        variant="outlined"
                        sx={{mt:3,mb:2,py:1}}
                        onClick={() => login(email,password,dataType)}
                    >
                    Log in
                    </Button>
                </Grid>

                <Grid item
                    sx={{textAlign:"right",width:"100%"}}
                >
                    <Link to={'/signup'}>
                        Don't have an account? Sign up
                    </Link>
                </Grid>

            </Grid>
        </Container>
    );
}