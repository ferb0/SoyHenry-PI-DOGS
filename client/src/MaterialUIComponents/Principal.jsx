import React from 'react';
import { useDispatch } from "react-redux";
import { getTempers } from '../redux/actions.js';

import NavBar from "./NavBar/NavBar";

import { ThemeProvider } from '@mui/material/styles';
import theme from '../global/Theme.js';

export default function Principal() {
    const dispatch = useDispatch();

    React.useEffect(() => {
        dispatch(getTempers());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <ThemeProvider theme={theme}>
        <NavBar />
        </ThemeProvider>
    )
};