import { GET_NUMBER_NEW_BREEDS_DB_REACHED } from "../actions/config_actions.js";
import { DEFAULT_BREEDS_FOR_PAGE } from '../../global/cant_summaries.js';

const configState = {
    numberNewBreedsDBReached: null,
    breedsForPage: DEFAULT_BREEDS_FOR_PAGE
};

const configReducer = (state = configState, action) => {
    switch (action.type) {
        case GET_NUMBER_NEW_BREEDS_DB_REACHED:
            return {
                ...state,
                numberNewBreedsDBReached: action.payload
            };

        default:
            return state;
    }
};

export default configReducer;
