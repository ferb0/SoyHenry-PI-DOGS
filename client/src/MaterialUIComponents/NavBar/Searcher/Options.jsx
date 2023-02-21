import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from 'react-router-dom';

import { getTempers, cleanAllData, getAllBreeds } from '../../../redux/actions.js'

import { Button, Stack } from "@mui/material";
import CleaningServicesIcon from '@mui/icons-material/CleaningServices';
import FiberNewIcon from '@mui/icons-material/FiberNew';

import { styleTextInput } from "../../../global/Themes.js";

export default function Options() {
    const dispatch = useDispatch();
    const history = useHistory();
    const maxNewBreeds = useSelector(state => state.numberNewBreedsDBReached);

    function cleanAll() {
        dispatch(cleanAllData());
        dispatch(getTempers());
        dispatch(getAllBreeds(''));
        history.push('/')
    };

    const handleNewBreed = () => {
        history.push('/createdBreed')
    };

    return (
        <Stack spacing={0.5} padding='0.3rem'>
            <Button
                variant="outlined"
                color='secondary'
                onClick={cleanAll}
                size='small'
                sx={{ ...styleTextInput, color: '#1e1e1e' }}
                endIcon={<CleaningServicesIcon />}>
                Clean All
            </Button>

            <Button
                variant="outlined"
                size='small'
                color='secondary'
                disabled={maxNewBreeds}
                onClick={handleNewBreed}
                sx={{ ...styleTextInput, color: '#1e1e1e' }}
                endIcon={<FiberNewIcon />}>
                New Breed
            </Button>
        </Stack>
    )
};