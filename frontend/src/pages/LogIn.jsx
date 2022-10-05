import React, { useEffect, useState } from 'react'
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { Link } from "react-router-dom";
import { useAuth } from "../providers/auth";
import { useNavigate } from "react-router-dom";


export default function LogIn() {

    // constant for the alert message
    const dataType="login"

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    
    const { login, user } = useAuth();
    const navigate = useNavigate();
        
    useEffect(() => {
        if (user?.data) navigate("/diseases")
        // eslint-disable-next-line
    },[user])

    return (
        <Container component="main" maxWidth="xs" sx={{pt:8}}>
            <CssBaseline />
            <Box
            sx={{
                marginTop: 8,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
            }}
            >
            <Typography component="h1" variant="h5">
                Log In
            </Typography>
            <Box sx={{ mt: 3 }}>
                <Grid container spacing={2}>
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
                </Grid>
                <Button
                    fullWidth
                    variant="outlined"
                    sx={{ mt: 3, mb: 2, py:1 }}
                    onClick={()=>login(email,password,dataType)}
                >
                Log in
                </Button>
                <Grid container justifyContent="flex-end">
                    <Grid item>
                        <Link to={'/signup'}>
                        Don't have an account? Sign up
                        </Link>
                    </Grid>
                </Grid>
            </Box>
            </Box>
           
        </Container>
    );
}