import {
    GET_ALL_BREED,
    SET_BREEDS,
    GET_BREED,
    LOADING_BREED,
    DELETE_BREED,
    MODIFY_BREED,
    CREATED_BREED,
    CLEAN_STATUS_CREATED_BREED,
    LOADING_ALL_BREED,
    CLEAN_STATUS_MODIFY_BREED,
    CLEAN_STATUS_DELETE_BREED,
    CLEAN_DATA_BREED
} from '../actions/breed_actions.js';

const breedsState = {
    breeds: [],
    breed: {},
    loadingBreed: false,
    numberNewBreedsDBReached: null,
    deleteBreed: null,
    modifyBreed: null,
    createdBreed: null,
    loadingAllBreed: null
};

const breedsReducer = (state = breedsState, action) => {
    switch (action.type) {
        case GET_ALL_BREED:
            return {
                ...state,
                breeds: action.payload,
                loadingAllBreed: false
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
            };

        case CLEAN_DATA_BREED:
            return breedsState;

        default:
            return state;
    }
};

export default breedsReducer;