const { REACT_APP_API_BASE_URL } = process.env;

export const GET_ALL_BREED = "GET_ALL_BREED";
export const SET_BREEDS = "SET_BREEDS";
export const GET_BREED = "GET_BREED";
export const LOADING_BREED = "LOADING_BREED";
export const DELETE_BREED = "DELETE_BREED";
export const MODIFY_BREED = "MODIFY_BREED";
export const CREATED_BREED = "CREATED_BREED";
export const CLEAN_STATUS_CREATED_BREED = "CLEAN_STATUS_CREATED_BREED";
export const LOADING_ALL_BREED = "LOADING_ALL_BREED";
export const CLEAN_STATUS_MODIFY_BREED = "CLEAN_STATUS_MODIFY_BREED";
export const CLEAN_STATUS_DELETE_BREED = "CLEAN_STATUS_DELETE_BREED";
export const CLEAN_DATA_BREED = "CLEAN_DATA_BREED";

export const loadingAllBreed = () => {
    return {
        type: LOADING_ALL_BREED,
        payload: true
    }
};

export const getAllBreeds = (breed) => {
    return function (dispatch) {
        dispatch(loadingAllBreed());
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

export const putModifyBreed = (data) => {
    return function (dispatch) {
        return fetch(REACT_APP_API_BASE_URL + `/dogs/update/${data.id}`,
            {
                method: "PUT",
                body: JSON.stringify(data),
                headers: { "Content-type": "application/json; charset=UTF-8" }
            })
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

export const postCreateBreed = (data) => {
    return function (dispatch) {
        return fetch(
            REACT_APP_API_BASE_URL + `/dogs`,
            {
                method: "POST",
                body: JSON.stringify(data),
                headers: { "Content-type": "application/json; charset=UTF-8" }
            })
            .then(response => response.json())
            .then((response) => {
                if (response.hasOwnProperty('msg'))
                    dispatch({ type: CREATED_BREED, payload: true })
                if (response.hasOwnProperty('err'))
                    dispatch({ type: CREATED_BREED, payload: false })
            })
            .catch(() => dispatch({ type: CREATED_BREED, payload: false }));
    }
};

export const cleanStatusCreateBreed = () => {
    return {
        type: CLEAN_STATUS_CREATED_BREED
    }
};

export const cleanStatuModifyBreed = () => {
    return {
        type: CLEAN_STATUS_MODIFY_BREED
    }
};

export const cleanStatuDeleteBreed = () => {
    return {
        type: CLEAN_STATUS_DELETE_BREED
    }
};

export const cleanDataBreed = () => {
    return {
        type: CLEAN_DATA_BREED
    }
};