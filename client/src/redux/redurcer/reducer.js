import {
  GET_ALL_BREED,
  GET_TEMPERS,
  SET_FILTERTYPE,
  SET_TEMPER,
  SET_BREEDS,
  GET_BREED,
  LOADING_BREED,
  SET_SORT_TYPE,
  CLEAN_ALL_DATA,
  LOADING_TEMPERS,
  FIRST_LOADING_OFF,
  GET_NUMBER_NEW_BREEDS_DB_REACHED,
  DELETE_BREED,
  MODIFY_BREED,
  CREATED_BREED,
  CLEAN_STATUS_CREATED_BREED,
  LOADING_ALL_BREED,
  CLEAN_STATUS_MODIFY_BREED,
  CLEAN_STATUS_DELETE_BREED
} from '../actions.js';

import { ALPHA_ASC } from '../../global/ConstSort.js'
import { combineReducers } from 'redux';

const defaultState = {
  breeds: [],
  breed: {},
  filterType: null,
  sortSelected: ALPHA_ASC,
  loadingBreed: false,
  firstLoading: true,
  numberNewBreedsDBReached: null,
  deleteBreed: null,
  modifyBreed: null,
  createdBreed: null,
  loadingAllBreed: null
};

const tempersState = {
  tempers: [],
  temperSelected: null,
  loadingTemper: false,
};

const defaultReducer = (state = defaultState, action) => {
  switch (action.type) {
    case GET_ALL_BREED:
      return {
        ...state,
        breeds: action.payload,
        loadingAllBreed: false
      };

    case SET_FILTERTYPE:
      return {
        ...state,
        filterType: action.payload
      };

    case SET_BREEDS:
      return {
        ...state,
        breeds: action.payload
      };

    case GET_BREED:
      return {
        ...state,
        breed: action.payload,
        loadingBreed: false
      };

    case LOADING_BREED:
      return {
        ...state,
        loadingBreed: true
      };

    case LOADING_TEMPERS:
      return {
        ...state,
        loadingTemper: true
      };

    case SET_SORT_TYPE:
      return {
        ...state,
        sortSelected: action.payload
      };

    case CLEAN_ALL_DATA:
      return {
        ...state,
        filterType: null,
        sortSelected: ALPHA_ASC,
        loadingBreed: false,
        loadingTemper: false
      };

    case FIRST_LOADING_OFF:
      return {
        ...state,
        firstLoading: false
      };

    case GET_NUMBER_NEW_BREEDS_DB_REACHED:
      return {
        ...state,
        numberNewBreedsDBReached: action.payload
      };

    case DELETE_BREED:
      return {
        ...state,
        deleteBreed: action.payload
      };

    case MODIFY_BREED:
      return {
        ...state,
        modifyBreed: action.payload
      };

    case CREATED_BREED:
      return {
        ...state,
        createdBreed: action.payload
      };

    case CLEAN_STATUS_CREATED_BREED:
      return {
        ...state,
        createdBreed: undefined
      };

    case LOADING_ALL_BREED:
      return {
        ...state,
        loadingAllBreed: true
      };

    case CLEAN_STATUS_MODIFY_BREED:
      return {
        ...state,
        modifyBreed: null
      };

    case CLEAN_STATUS_DELETE_BREED:
      return {
        ...state,
        deleteBreed: null
      }
    default:
      return state;
  }
};

const temperReducer = (state = tempersState, action) => {
  switch (action.type) {
    case GET_TEMPERS:
      return {
        ...state,
        tempers: action.payload,
        loadingTemper: false
      };

    case SET_TEMPER:
      return {
        ...state,
        temperSelected: action.payload
      };

    default:
      return state;
  }
};

let rootReducer = combineReducers({
  defaultReducer,
  temperReducer
});

export default rootReducer;