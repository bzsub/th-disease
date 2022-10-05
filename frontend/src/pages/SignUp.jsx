import React, { useEffect, useState } from 'react'
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../providers/auth";

import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';


export default function SignUp() {

    // constant for the alert message
    const dataType="signUp"

    const navigate = useNavigate()
    
    const { signUp, user } = useAuth();

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [passwordAgain, setPasswordAgain] = useState("")

    useEffect(() => {
        if (user?.data) navigate("/diseases")
        // eslint-disable-next-line
    },[user])

    return (

        <Container component="main" maxWidth="xs" >

            <Grid container spacing={2} sx={{mt:20}}>

                <Grid item xs={12}>
                    <Typography 
                        component="h1" 
                        variant="h4" 
                        sx={{textAlign:"center",mb:3}}
                    >
                        Sign up
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
                    <TextField
                        fullWidth
                        label="Password Again"
                        type="password"
                        value={passwordAgain}
                        onChange={e => setPasswordAgain(e.target.value)}
                    />
                </Grid>

                <Grid item xs={12}>
                    <FormControlLabel
                        control={<Checkbox color="primary" />}
                        label="I want to receive inspiration, marketing promotions and updates via email."
                    />
                </Grid>

                <Grid item xs={12}>
                    <Button
                        fullWidth
                        variant="outlined"
                        sx={{mt:3,mb:2,py:1}}
                        onClick={() => signUp(email, password, passwordAgain, dataType) }
                    >
                        Sign Up
                    </Button>
                </Grid>

                <Grid item 
                    sx={{textAlign:"right",width:"100%"}}
                >
                    <Link to={'/login'}>
                        Already have an account? Log in
                    </Link>
                </Grid>

            </Grid>
         
        </Container>
    );
}