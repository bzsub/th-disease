import React from 'react'

import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';


const TableHeadComponent = ({ list }) => {

    const style = {
        textTransform: "uppercase",
        borderBottom:"2px solid black",
        fontSize:"1.2rem",
        fontWeight:"600",
        textAlign:"center"
    }

    const emptyStyle = {
        borderBottom:"2px solid black",
        width:"3rem",
        textAlign:"center"
    }

    return (

        <TableHead>
            <TableRow>
                {
                    list.map(item => 
                        item ? 
                        <TableCell key={item} sx={style}>{item}</TableCell> 
                        :
                        <TableCell key={item} sx={emptyStyle}></TableCell> 
                    )
                }
            </TableRow>
        </TableHead>
    )
}


export default TableHeadComponent