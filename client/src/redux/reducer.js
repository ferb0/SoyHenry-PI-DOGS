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
  LOADING_TEMPERS
} from './actions.js';

import { ALL } from '../global/ConstSource.js'

const initialState = {
  breeds: [],
  breed: {},
  tempers: [],
  filterType: ALL,
  temperSelected: "",
  sortSelected: null,
  loadingBreed: false,
  loadingTemper: false
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_BREED:
      return {
        ...state,
        breeds: action.payload,
        loadingBreed: false
      };

    case SET_FILTERTYPE:
      return {
        ...state,
        filterType: action.payload
      };

    case GET_TEMPERS:
      return {
        ...state,
        tempers: action.payload,
        loadingTemper: false
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
        ...initialState
      };

    default:
      return state;
  }
};

export default rootReducer;