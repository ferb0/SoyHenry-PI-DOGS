import { GET_NUMBER_NEW_BREEDS_DB_REACHED } from "../actions/configActions";

const configState = {
    numberNewBreedsDBReached: null
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