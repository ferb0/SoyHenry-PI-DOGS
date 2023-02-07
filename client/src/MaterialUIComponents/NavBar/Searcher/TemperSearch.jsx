import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { setTemper } from '../../../redux/actions.js';

import { Typography, TextField, Autocomplete } from '@mui/material';

export default function TemperSearch() {
    const dispatch = useDispatch();

    let tempers = useSelector(state => state.tempers);

    function handleOnChangeTempers(temper) {
        dispatch(setTemper(temper));
    };

    return (
        <>
            {tempers ? <Autocomplete
                size="small"
                options={tempers}
                sx={{ width: 175 }}
                renderInput={(params) => <TextField {...params} label="Temperaments" />}
                onChange={(event, value) => handleOnChangeTempers(value)} /> :
                <Typography sx={{ color: 'red' }}>
                    Error to load Temperaments.
                </Typography>}
        </>
    )
};