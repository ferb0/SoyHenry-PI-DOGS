import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { setTemper } from '../../redux/actions.js';

import { AppBar, IconButton, Stack, Toolbar, Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

export default function NavBar() {
    const dispatch = useDispatch();

    let { tempers } = useSelector(state => {
        return {
            tempers: state.tempers,
            temperSelected: state.temperSelected,
            loading: state.loadingTemper
        }
    });

    function handleOnChangeTempers(temper) {
        dispatch(setTemper(temper));
    };

    return (
        <AppBar position="sticky">
            <Toolbar>
                <IconButton
                    size="large"
                    edge="start"
                    color="inherit"
                    aria-label="menu"
                    sx={{ mr: 2 }}>
                    <MenuIcon />
                </IconButton>
                <Typography variant="h6">
                    InfoDog
                </Typography>

                <Stack direction='row'>
                    <Autocomplete
                        options={tempers}
                        sx={{ width: 175, padding: '0.7rem' }}
                        renderInput={(params) => <TextField {...params} label="Temperaments" />}
                        onChange={(event, value) => handleOnChangeTempers(value)}
                    />
                </Stack>
            </Toolbar>
        </AppBar>
    )
};