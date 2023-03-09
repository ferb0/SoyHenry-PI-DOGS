import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import thunk from 'redux-thunk';

import defaultReducer from './reducer/default_reducer.js';
import breedsReducer from './reducer/breeds_reducer.js';
import temperReducer from './reducer/temper_reducer.js';
import configReducer from './reducer/config_reducer.js';

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