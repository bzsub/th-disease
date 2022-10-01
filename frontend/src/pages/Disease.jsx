import React from 'react'
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import CardComponent from '../components/CardComponent';
import Container from '@mui/material/Container';


const Disease = () => {
  return (
    <Container sx={{paddingTop:'5rem'}}>
        <Typography variant="h6" gutterBottom component="div">
            Search for disease:
        </Typography>

        <TextField label="search" variant="outlined" sx={{margin:'0 auto 1rem', width:'100%'}} />
        
        <Box sx={{display:'flex'}}>
            <CardComponent/>
            <CardComponent/>
            <CardComponent/>
            <CardComponent/>
        </Box>
    </Container>
  )
}

export default Disease