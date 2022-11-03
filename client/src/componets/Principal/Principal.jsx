import React from 'react';
import { Route } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { getTempers } from '../../redux/actions.js'

import Pagination from '../Pagination/Pagination.jsx';
import Createbreed from '../CreateBreed/CreateBreed.jsx';
import DetailBreed from '../DetailBreed/DetailBreed.jsx';
import Nav from '../Nav/Nav.jsx'
import Search from '../Search/Search.jsx';

export default function Principal() {
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(getTempers());
  }, []);

  return (
    <div className="App">
      <Nav />
      <Route exact path='/' component={Search} />
      <Route exact path='/' component={Pagination} />
      <Route exact path='/create' component={Createbreed} />
      <Route path='/breed/:id' component={DetailBreed} />
    </div>
  );
}