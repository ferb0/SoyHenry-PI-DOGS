import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import thunk from 'redux-thunk';

import defaultReducer from './reducer/defaultReducer.js';
import breedsReducer from './reducer/breedsReducer.js';
import temperReducer from './reducer/temperReducer.js';
import configReducer from './reducer/configReducer.js';

const composeEnhancers =
   (typeof window !== 'undefined' &&
      window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
   compose;

let rootReducer = combineReducers({
   configReducer,
   defaultReducer,
   breedsReducer,
   temperReducer
});

const store = createStore(
   rootReducer,
   composeEnhancers(applyMiddleware(thunk)),
);

export default store;