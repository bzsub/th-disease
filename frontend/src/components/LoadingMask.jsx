import React from 'react'
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';


const LoadingMask = ({isLoading}) => {
    
    return (
    <>
      <Backdrop
        sx={{ color: '#fff', zIndex: "2" }}
        open={isLoading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </>
  )
}

export default LoadingMask