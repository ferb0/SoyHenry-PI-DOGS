const { REACT_APP_API_BASE_URL } = process.env;

export const GET_TEMPERS = "GET_TEMPERS";
export const SET_TEMPER = "SET_TEMPER";
export const LOADING_TEMPERS = "LOADING_TEMPERS";
export const CLEAN_TEMPERS = "CLEAN_TEMPERS";

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

export const cleanTempers = () => {
    return {
        type: CLEAN_TEMPERS
    }
};