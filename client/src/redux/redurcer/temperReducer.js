import {
    GET_TEMPERS,
    SET_TEMPER
} from '../actions.js';

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

        default:
            return state;
    }
};

export default temperReducer;