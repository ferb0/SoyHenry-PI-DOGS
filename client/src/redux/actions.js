export const GET_ALL_BREED = "GET_ALL_BREED";
export const SET_FILTERTYPE = "SET_FILTERTYPE";
export const GET_TEMPERS = "GET_TEMPERS";
export const SET_TEMPER = "SET_TEMPER";
export const SET_BREEDS = "SET_BREEDS";
export const GET_BREED = "GET_BREED";
export const LOADING_BREED = "LOADING_BREED";
export const SET_SORT_TYPE = "SET_SORT_TYPE";
export const CLEAN_ALL_DATA = "CLEAN_ALL_DATA";
export const LOADING_TEMPERS = "LOADING_TEMPERS";
export const FIRST_LOADING_OFF = "FIRST_LOADING_OFF";
export const GET_NUMBER_NEW_BREEDS_DB_REACHED = "GET_NUMBER_NEW_BREEDS_DB_REACHED";
export const DELETE_BREED = "DELETE_BREED";
export const MODIFY_BREED = "MODIFY_BREED";

const { REACT_APP_API_BASE_URL } = process.env;

export const getAllBreeds = (breed) => {
    return function (dispatch) {
        dispatch(loadingBreed());
        return fetch(REACT_APP_API_BASE_URL + `/dogs?name=${breed}`)
            .then(response => response.json())
            .then((response) => {
                if (response.hasOwnProperty('msg'))
                    dispatch({ type: GET_ALL_BREED, payload: response.msg })
                if (response.hasOwnProperty('err'))
                    dispatch({ type: GET_ALL_BREED, payload: false })
            })
            .catch(() => dispatch({ type: GET_ALL_BREED, payload: false }));
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
        dispatch(loadingTempers());
        return fetch(REACT_APP_API_BASE_URL + `/temperaments`)
            .then(response => response.json())
            .then((response) => {
                if (response.hasOwnProperty('msg'))
                    dispatch({
                        type: GET_TEMPERS, payload: response.msg.sort((first, second) => {
                            if (first.toLowerCase() < second.toLowerCase())
                                return -1
                            if (first.toLowerCase() > second.toLowerCase())
                                return 1
                            return 0;
                        })
                    })
                if (response.hasOwnProperty('err'))
                    dispatch({ type: GET_TEMPERS, payload: false })
            })
            .catch(() => dispatch({ type: GET_TEMPERS, payload: false }));
    }
};

export const loadingTempers = () => {
    return {
        type: LOADING_TEMPERS,
        payload: true
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
        dispatch(loadingBreed());
        return fetch(REACT_APP_API_BASE_URL + `/dogs/${id}`)
            .then(response => response.json())
            .then((response) => {
                if (response.hasOwnProperty('msg'))
                    dispatch({ type: GET_BREED, payload: response.msg })
                if (response.hasOwnProperty('err'))
                    dispatch({ type: GET_BREED, payload: false })
            })
            .catch(() => dispatch({ type: GET_BREED, payload: false }));
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

export const firstLoadingOff = () => {
    return {
        type: FIRST_LOADING_OFF
    }
};

export const setNumberBreedDB = () => {
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

export const postdeleteBreed = (idBreed) => {
    return function (dispatch) {
        return fetch(REACT_APP_API_BASE_URL + `/dogs/delete/${idBreed}`,
            { method: "DELETE" })
            .then(response => response.json())
            .then((response) => {
                if (response.hasOwnProperty('msg'))
                    dispatch({ type: DELETE_BREED, payload: true })
                if (response.hasOwnProperty('err'))
                    dispatch({ type: DELETE_BREED, payload: false })
            })
            .catch(() => dispatch({ type: DELETE_BREED, payload: false }));
    }
};

export const putModifyBreed = (idBreed) => {
    return function (dispatch) {
        return fetch(REACT_APP_API_BASE_URL + `/dogs/modify/${idBreed}`,
            { method: "PUT" })
            .then(response => response.json())
            .then((response) => {
                if (response.hasOwnProperty('msg'))
                    dispatch({ type: MODIFY_BREED, payload: true })
                if (response.hasOwnProperty('err'))
                    dispatch({ type: MODIFY_BREED, payload: false })
            })
            .catch(() => dispatch({ type: MODIFY_BREED, payload: false }));
    }
};