import {
  GET_BREED,
  SET_FILTERTYPE
} from './actions.js';

import { ALL } from '../global/constSource.js'

const initialState = {
  breeds: [],
  filterType: ALL
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

    default:
      return state;
  }
};

export default rootReducer;