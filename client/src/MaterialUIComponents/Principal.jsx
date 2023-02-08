import React from 'react';
import { useDispatch } from "react-redux";
import { getTempers, getAllBreeds } from '../redux/actions.js';
import { Route, Switch } from 'react-router-dom';

import NavBar from "./NavBar/NavBar.jsx";
import Breeds from './Breeds/Breeds.jsx';
import BreedDetail from './BreedDetail.jsx';

import { ThemeProvider } from '@mui/material/styles';
import theme from '../global/Theme.js';

export default function Principal() {
    const dispatch = useDispatch();

    React.useEffect(() => {
        dispatch(getTempers());
        dispatch(getAllBreeds(''));
    }, [dispatch]);

    return (
        <Switch>
            <Route exact path="/">
                <ThemeProvider theme={theme}>
                    <NavBar />
                    <Breeds />
                </ThemeProvider>
            </Route>
            <Route path='/detail/:id'>
                <BreedDetail />
            </Route>
        </Switch>

    )
};