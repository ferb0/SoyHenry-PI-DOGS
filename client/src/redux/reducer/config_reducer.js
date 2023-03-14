import {
    GET_NUMBER_NEW_BREEDS_DB_REACHED,
    GET_NUMBER_BREEDS_FOR_PAGE,
    GET_CONST_SOURCES
} from "../actions/config_actions.js";
import { DEFAULT_BREEDS_FOR_PAGE } from '../../global/cant_summaries.js';

const configState = {
    numberNewBreedsDBReached: null,
    breedsForPage: DEFAULT_BREEDS_FOR_PAGE,
    constSources: null
};

const configReducer = (state = configState, action) => {
    switch (action.type) {
        case GET_NUMBER_NEW_BREEDS_DB_REACHED:
            return {
                ...state,
                numberNewBreedsDBReached: action.payload
            };

        case GET_NUMBER_BREEDS_FOR_PAGE:
            return {
                ...state,
                breedsForPage: action.payload
            };

        case GET_CONST_SOURCES:
            return {
                ...state,
                constSources: action.payload
            };

        default:
            return state;
    }
};

export default configReducer;
