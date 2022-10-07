import React from 'react';

import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';


const SearchBar = ({ labelText, list, search, setSearch }) => {

    return (

        <Autocomplete
            onChange={(event, value) => setSearch(value)}
            sx={{width:"50%",margin:"3rem auto 0"}}
            options={list.map(disease => disease.name)}
            renderInput={params => 
                <TextField 
                    {...params} 
                    label={"search for a "+labelText}
                    value={search} 
                    onChange={e => setSearch(e.target.value)}
                /> 
            }
        />
    )
}

export default SearchBar