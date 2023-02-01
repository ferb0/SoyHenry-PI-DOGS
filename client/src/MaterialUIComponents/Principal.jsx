import React from 'react';
import { useDispatch } from "react-redux";
import { getTempers, getAllBreeds } from '../redux/actions.js';

import NavBar from "./NavBar/NavBar";
import Breeds from './Breeds/Breeds.jsx';

import { ThemeProvider } from '@mui/material/styles';
import theme from '../global/Theme.js';

export default function Principal() {
    const dispatch = useDispatch();

    React.useEffect(() => {
        dispatch(getTempers());
        dispatch(getAllBreeds(''));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <ThemeProvider theme={theme}>
        <NavBar />
        <Breeds />
        </ThemeProvider>
    )
};