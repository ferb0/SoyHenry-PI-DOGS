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
    // Comantario para quitar mensaje de advertencia con el uso de dispatch en useEfect.
    // Creo que es porque hay código asincrónico en el action.
    // eslint-disable-next-line react-hooks/exhaustive-deps
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