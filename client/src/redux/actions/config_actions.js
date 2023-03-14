import { DEFAULT_BREEDS_FOR_PAGE } from '../../global/cant_summaries.js';
const { REACT_APP_API_BASE_URL } = process.env;

export const GET_NUMBER_NEW_BREEDS_DB_REACHED = "GET_NUMBER_NEW_BREEDS_DB_REACHED";
export const GET_NUMBER_BREEDS_FOR_PAGE = "GET_NUMBER_BREEDS_FOR_PAGE";

export const getNumberBreedDB = () => {
    return function (dispatch) {
        return fetch(REACT_APP_API_BASE_URL + `/config/breedsNumber`)
            .then(response => response.json())
            .then((response) => {
                if (response.hasOwnProperty('msg'))
                    dispatch({ type: GET_NUMBER_NEW_BREEDS_DB_REACHED, payload: response.msg })
                if (response.hasOwnProperty('err'))
                    dispatch({ type: GET_NUMBER_NEW_BREEDS_DB_REACHED, payload: false })
            })
            .catch(() => dispatch({ type: GET_NUMBER_NEW_BREEDS_DB_REACHED, payload: false }));
    }
};

export const getNumberBreedsForPage = () => {
    return function (dispatch) {
        return fetch(REACT_APP_API_BASE_URL + `/config/breedsForPage`)
            .then(response => response.json())
            .then((response) => {
                if (response.hasOwnProperty('msg'))
                    dispatch({ type: GET_NUMBER_BREEDS_FOR_PAGE, payload: parseInt(response.msg) })
                if (response.hasOwnProperty('err'))
                    dispatch({ type: GET_NUMBER_BREEDS_FOR_PAGE, payload: DEFAULT_BREEDS_FOR_PAGE })
            })
            .catch(() => dispatch({ type: GET_NUMBER_BREEDS_FOR_PAGE, payload: DEFAULT_BREEDS_FOR_PAGE }));
    }
};
