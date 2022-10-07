import React from 'react'

import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import TablePagination from '@mui/material/TablePagination';


const Pagination = ({ 
    diseaseList, 
    page, 
    rowsPerPage, 
    handleChangePage, 
    handleChangeRowsPerPage
}) => {

    return (

        <TableRow>                     
            <TableCell colSpan="5" sx={{textAlign:"right"}}>
                <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={diseaseList.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </TableCell>
        </TableRow>
    )
}


export default Pagination