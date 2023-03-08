import React from 'react';
import { useDispatch } from "react-redux";
import { getTempers, getAllBreeds, setNumberBreedDB } from '../redux/actions/defaultActions.js';
import { Route, Switch } from 'react-router-dom';

import NavBar from "./NavBar/NavBar.jsx";
import Breeds from './BreedsList/Breeds.jsx';
import BreedDetail from './BreedDetail.jsx';
import Footer from './Footer.jsx';
import CreatedModifyBreed from './CreatedModifyBreed.jsx';

export default function Principal() {
    const dispatch = useDispatch();

    React.useEffect(() => {
        dispatch(getTempers());
        dispatch(getAllBreeds(''));
        dispatch(setNumberBreedDB());
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