import { GET_NUMBER_NEW_BREEDS_DB_REACHED } from "../actions/configActions";
import { BREEDS_FOR_PAGE } from '../../global/CantSummaries.js';

const configState = {
    numberNewBreedsDBReached: null,
    breedsForPage: BREEDS_FOR_PAGE
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
