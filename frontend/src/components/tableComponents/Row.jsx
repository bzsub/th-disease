import React from 'react'

import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import Button from "@mui/material/Button";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { useAuth } from '../../providers/auth.jsx';


const TableRowComponent = ({ id, disease, toggleView }) => {

    const { user } = useAuth();

    return (

        <TableRow key={id}> 
            <TableCell align="center">{disease.name}</TableCell>
            <TableCell align="center">{disease.description}</TableCell>
            <TableCell align="center">{disease.risks.length} risks</TableCell>
            <TableCell align="center">{disease.symptoms.length} symptoms</TableCell>
            <TableCell align="center">
                {
                    user && <Button onClick={() => toggleView(disease.name, disease.toggleView)}>                                 
                        {
                            disease.toggleView ?
                            <KeyboardArrowUpIcon/> :
                            <KeyboardArrowDownIcon/>
                        }
                    </Button>
                }
            </TableCell>   
        </TableRow> 
    )
}


export default TableRowComponent