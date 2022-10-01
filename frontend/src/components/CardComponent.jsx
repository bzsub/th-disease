import React from 'react'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

const CardComponent = () => {
  return (
    <Card sx={{ minWidth: 275, border:'1px solid black',margin:'0.5rem' }}>
        <CardContent>
          <Typography variant="h5" component="div">
            ola
          </Typography>
          <Typography variant="body2" color="text.secondary">
            well meaning and kindly.
            <br />
            {'"a benevolent smile"'}
          </Typography>
        </CardContent>
      </Card>
  )
}

export default CardComponent