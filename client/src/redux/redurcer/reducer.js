import { combineReducers } from 'redux';

import {
  SET_FILTERTYPE,
  SET_SORT_TYPE,
  FIRST_LOADING_OFF
} from '../actions.js';
import { ALPHA_ASC } from '../../global/ConstSort.js'

import temperReducer from './temperReducer.js';
import breedsReducer from './breedsReducer.js';

const defaultState = {
  filterType: null,
  sortSelected: ALPHA_ASC,
  firstLoading: true
};

const defaultReducer = (state = defaultState, action) => {
  switch (action.type) {
    case SET_FILTERTYPE:
      return {
        ...state,
        filterType: action.payload
      };

    case SET_SORT_TYPE:
      return {
        ...state,
        sortSelected: action.payload
      };

    case FIRST_LOADING_OFF:
      return {
        ...state,
        firstLoading: false
      };

    default:
      return state;
  }
};

let rootReducer = combineReducers({
  defaultReducer,
  temperReducer,
  breedsReducer
});

export default rootReducer;