import React, { useEffect, useState } from 'react'
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { Link } from "react-router-dom";
import { useAuth } from "../providers/auth";
import { useNavigate } from "react-router-dom";
import { ErrorAlert } from "../utils/AlertMessages";

export default function SignUp() {
    // constant for the alert message
    const dataType="signUp"

    const navigate = useNavigate()

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [passwordAgain, setPasswordAgain] = useState("")

    const { signUp, user } = useAuth();
    useEffect(() => {
        if (user?.data) navigate("/diseases")
        // eslint-disable-next-line
    },[user])

    const handleSignUp = async () => { 
        if (!email || !password || password !== passwordAgain) ErrorAlert("The passwords must match"); 
        else signUp(email, password, dataType) 
    }

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
                Sign up
            </Typography>
            <Box component="form" sx={{ mt: 3 }}>
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
                </Grid>
                <Button
                    fullWidth
                    variant="outlined"
                    sx={{ mt: 3, mb: 2, py: 1 }}
                    onClick={handleSignUp}
                >
                    Sign Up
                </Button>
                <Grid container justifyContent="flex-end">
                    <Grid item>
                        <Link to={'/login'}>
                        Already have an account? Log in
                        </Link>
                    </Grid>
                </Grid>
            </Box>
            </Box>
            
        </Container>
    );
}