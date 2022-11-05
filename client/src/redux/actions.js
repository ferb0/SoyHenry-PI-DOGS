export const GET_ALL_BREED = "GET_ALL_BREED";
export const SET_FILTERTYPE = "SET_FILTERTYPE";
export const GET_TEMPERS = "GET_TEMPERS";
export const SET_TEMPER = "SET_TEMPER";
export const SET_BREEDS = "SET_BREEDS";
export const GET_BREED = "GET_BREED";
export const LOADING_BREED = "LOADING_BREED";
export const SET_SORT_TYPE = "SET_SORT_TYPE";
export const CLEAN_ALL_DATA = "CLEAN_ALL_DATA";

export const getAllBreeds = (breed) => {
    return function (dispatch) {
        dispatch(loadingBreed())
        return fetch(`http://localhost:3001/dogs?name=${breed}`)
            .then(response => response.json())
            .then(json => dispatch({ type: GET_ALL_BREED, payload: json }))
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

export const loadingBreed = () => {
    return {
        type: LOADING_BREED,
        payload: true
    }
};

export const getBreed = (id) => {
    return function (dispatch) {
        dispatch(loadingBreed())
        return fetch(`http://localhost:3001/dogs/${id}`)
            .then(response => response.json())
            .then(json => dispatch({ type: GET_BREED, payload: json }))
    }
};

export const cleanBreed = () => {
    return {
        type: GET_BREED,
        payload: {}
    }
};

export const setSortType = (sort) => {
    return {
        type: SET_SORT_TYPE,
        payload: sort
    }
}

export const cleanAllData = () => {
    return {
        type: CLEAN_ALL_DATA
    }
};