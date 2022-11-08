import React from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { getTempers } from '../../redux/actions.js'

import Pagination from '../Pagination/Pagination.jsx';
import Createbreed from '../CreateBreed/CreateBreed.jsx';
import DetailBreed from '../DetailBreed/DetailBreed.jsx';
import LandingPage from '../LandingPage/LandingPage.jsx';

export default function Principal() {
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(getTempers());
  }, []);

  return (
    <div className="App">
      <Switch>
        <Route exact path='/' component={LandingPage} />
        <Route exact path='/principal' component={Pagination} />
        <Route path='/create' component={Createbreed} />
        <Route path='/breed/:id' component={DetailBreed} />

        <Redirect from='*' to='/' />
      </Switch>
    </div>
  );
}