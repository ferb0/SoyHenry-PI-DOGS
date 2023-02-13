import React from "react";
import { useDispatch } from "react-redux";
import { useHistory } from 'react-router-dom';

import { getTempers, cleanAllData, getAllBreeds } from '../../../redux/actions.js'

import { Button, Stack } from "@mui/material";


export default function Options() {
    const dispatch = useDispatch();
    const history = useHistory();

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
        <Stack>
            <Button
                variant="text"
                onClick={cleanAll}
                size='small'
                sx={{
                    color: { sm: 'grey', xs: 'grey', md: 'black' },
                    borderColor: { sm: 'grey', xs: 'grey', md: 'black' }
                }}>
                Clear All
            </Button>

            <Button
                variant="text"
                size='small'
                onClick={handleNewBreed}
                sx={{
                    color: { sm: 'grey', xs: 'grey', md: 'black' },
                    borderColor: { sm: 'grey', xs: 'grey', md: 'black' }
                }}>
                New Breed
            </Button>
        </Stack>
    )
};