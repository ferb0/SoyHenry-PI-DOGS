import {
  GET_ALL_BREED,
  GET_TEMPERS,
  SET_FILTERTYPE,
  SET_TEMPER,
  SET_BREEDS,
  GET_BREED
} from './actions.js';

import { ALL } from '../global/ConstSource.js'

const initialState = {
  breeds: [],
  breed: {},
  filterType: ALL,
  tempers: [],
  temperSelected: ""
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_BREED:
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

    case SET_BREEDS:
      return {
        ...state,
        breeds: action.payload
      };

    case GET_BREED:
      return {
        ...state,
        breed: action.payload
      };

    default:
      return state;
  }
};

export default rootReducer;