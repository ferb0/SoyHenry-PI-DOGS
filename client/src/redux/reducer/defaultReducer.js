import {
  SET_FILTERTYPE,
  SET_SORT_TYPE,
  FIRST_LOADING_OFF,
  CLEAN_DATA_DEFAULT
} from '../actions/defaultActions.js';
import { ALPHA_ASC } from '../../global/ConstSort.js'

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

    case CLEAN_DATA_DEFAULT:
      return defaultState;

    default:
      return state;
  }
};

export default defaultReducer;