import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import thunk from 'redux-thunk';

import defaultReducer from './reducer/defaultReducer.js';
import breedsReducer from './reducer/breedsReducer.js';
import temperReducer from './reducer/temperReducer.js';

const composeEnhancers =
   (typeof window !== 'undefined' &&
      window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
   compose;

let rootReducer = combineReducers({
   defaultReducer,
   temperReducer,
   breedsReducer
});

const store = createStore(
   rootReducer,
   composeEnhancers(applyMiddleware(thunk)),
);

export default store;