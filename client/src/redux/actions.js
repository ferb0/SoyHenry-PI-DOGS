export const GET_BREED = "GET_BREED";
export const SET_FILTERTYPE = "SET_FILTERTYPE";
export const GET_TEMPERS = "GET_TEMPERS";
export const SET_TEMPER = "SET_TEMPER";
export const SET_BREEDS = "SET_BREEDS";

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

export const getTempers = () => {
    return function (dispatch) {
        return fetch(`http://localhost:3001/temperaments`)
            .then(response => response.json())
            .then(json => dispatch({ type: GET_TEMPERS, payload: json.sort() }))
    }
};

export const setTemper = (temper) => {
    return {
        type: SET_TEMPER,
        payload: temper
    }
};

export const setBreeds = (breeds) => {
    return {
        type: SET_BREEDS,
        payload: breeds
    }

};