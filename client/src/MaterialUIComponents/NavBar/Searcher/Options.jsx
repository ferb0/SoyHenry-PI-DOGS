import React from "react";
import { useDispatch } from "react-redux";
import { getTempers, cleanAllData, getAllBreeds } from '../../../redux/actions.js'

import { Button, Stack } from "@mui/material";

export default function Options() {
    const dispatch = useDispatch();

    function cleanAll() {
        dispatch(cleanAllData());
        dispatch(getTempers());
        dispatch(getAllBreeds(''));
    };

    return (
        <Stack>
            <Button variant="text" onClick={cleanAll} sx={{ color: 'white', padding: '0' }}>
                Clear All
            </Button>
        </Stack>
    )
};