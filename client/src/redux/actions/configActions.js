const { REACT_APP_API_BASE_URL } = process.env;

export const GET_NUMBER_NEW_BREEDS_DB_REACHED = "GET_NUMBER_NEW_BREEDS_DB_REACHED";

export const getNumberBreedDB = () => {
    return function (dispatch) {
        return fetch(REACT_APP_API_BASE_URL + `/dogs/breedsNumber`)
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
