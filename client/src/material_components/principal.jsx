import React from 'react';
import { useDispatch } from "react-redux";
import { getTempers } from '../redux/actions/temper_actions.js';
import { getAllBreeds } from '../redux/actions/breed_actions.js';
import { getNumberBreedDB } from '../redux/actions/config_actions.js';

import { Route, Switch } from 'react-router-dom';

import NavBar from "./nav_bar/nav_bar.jsx";
import Breeds from './breeds_list/breeds.jsx';
import BreedDetail from './breed_detail.jsx';
import Footer from './footer.jsx';
import CreatedModifyBreed from './created_modify_breed.jsx';

export default function Principal() {
    const dispatch = useDispatch();

    React.useEffect(() => {
        dispatch(getTempers());
        dispatch(getAllBreeds(''));
        dispatch(getNumberBreedDB());
    }, [dispatch]);

    return (
        <Switch>
            <Route path="/">
                <NavBar />
                <Route exact path="/" component={Breeds} />
                <Route path='/detail/:id' component={BreedDetail} />
                <Route path='/createdBreed' component={CreatedModifyBreed} />
                <Route path='/modifyBreed/:id' component={CreatedModifyBreed} />
                <Footer />
            </Route>
        </Switch>
    )
};