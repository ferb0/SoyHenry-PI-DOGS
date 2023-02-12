import React from 'react';
import { useDispatch } from "react-redux";
import { getTempers, getAllBreeds } from '../redux/actions.js';
import { Route, Switch } from 'react-router-dom';

import NavBar from "./NavBar/NavBar.jsx";
import Breeds from './Breeds/Breeds.jsx';
import BreedDetail from './BreedDetail.jsx';
import Footer from './Footer.jsx';
import CreatedBreed from './NavBar/CreatedBreed.jsx';

export default function Principal() {
    const dispatch = useDispatch();

    React.useEffect(() => {
        dispatch(getTempers());
        dispatch(getAllBreeds(''));
    }, [dispatch]);

    return (
        <Switch>
            <Route path="/">
                <NavBar />
                <Route exact path="/" component={Breeds} />
                <Route path='/detail/:id' component={BreedDetail} />
                <Route path='/createdBreed' component={CreatedBreed} />
                <Footer />
            </Route>
        </Switch>
    )
};