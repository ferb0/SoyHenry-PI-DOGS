export const GET_BREED = "GET_BREED";
export const SET_FILTERTYPE = "SET_FILTERTYPE";

export const getBreed = (breed) => {
    return function (dispatch) {
        return fetch(`http://localhost:3001/dogs?name=${breed}`)
            .then(response => response.json())
            .then(json => dispatch({ type: GET_BREED, payload: json }))
    }
};

export const setFilterType = (filter) => {
    return {
        type: SET_FILTERTYPE,
        payload: filter
    }
};