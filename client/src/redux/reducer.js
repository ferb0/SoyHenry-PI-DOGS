import {
  GET_BREED,
  GET_TEMPERS,
  SET_FILTERTYPE,
  SET_TEMPER
} from './actions.js';

import { ALL } from '../global/constSource.js'

const initialState = {
  breeds: [],
  filterType: ALL,
  tempers: [],
  temperSelected: ""
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_BREED:
      return {
        ...state,
        breeds: action.payload
      };

    case SET_FILTERTYPE:
      return {
        ...state,
        filterType: action.payload
      };

    case GET_TEMPERS:
      return {
        ...state,
        tempers: action.payload
      }

    case SET_TEMPER:
      return {
        ...state,
        temperSelected: action.payload
      };

    default:
      return state;
  }
};

export default rootReducer;