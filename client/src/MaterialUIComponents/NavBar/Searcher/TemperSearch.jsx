import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { setTemper } from '../../../redux/actions/temperActions.js';

import { TextField, Autocomplete } from '@mui/material';
import { styleTextInput } from "../../../global/Themes.js";

export default function TemperSearch() {
    const dispatch = useDispatch();

    let tempers = useSelector(state => state.temperReducer.tempers);
    let temperSelected = useSelector(state => state.temperReducer.temperSelected);

    function handleOnChangeTempers(temper) {
        dispatch(setTemper(temper));
    };

    return (
        <Autocomplete
            size="small"
            options={tempers || []}
            sx={{ ...styleTextInput, width: 175 }}
            renderInput={(params) => <TextField {...params} label="Temperaments" />}
            onChange={(event, value) => handleOnChangeTempers(value)}
            value={temperSelected} />
    )
};