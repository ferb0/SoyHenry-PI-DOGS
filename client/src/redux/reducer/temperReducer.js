import {
    GET_TEMPERS,
    SET_TEMPER,
    LOADING_TEMPERS
} from '../actions/defaultActions.js';

const tempersState = {
    tempers: [],
    temperSelected: null,
    loadingTemper: false,
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

        case LOADING_TEMPERS:
            return {
                ...state,
                loadingTemper: true
            };

        default:
            return state;
    }
};

export default temperReducer;