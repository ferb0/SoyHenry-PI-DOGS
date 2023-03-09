export const SET_FILTERTYPE = "SET_FILTERTYPE";
export const SET_SORT_TYPE = "SET_SORT_TYPE";
export const FIRST_LOADING_OFF = "FIRST_LOADING_OFF";
export const CLEAN_DATA_DEFAULT = "CLEAN_DATA_DEFAULT";

export const setFilterType = (filter) => {
    return {
        type: SET_FILTERTYPE,
        payload: filter
    }
};

export const setSortType = (sort) => {
    return {
        type: SET_SORT_TYPE,
        payload: sort
    }
}

export const firstLoadingOff = () => {
    return {
        type: FIRST_LOADING_OFF
    }
};

export const cleanDataDefault = () => {
    return {
        type: CLEAN_DATA_DEFAULT
    }
};