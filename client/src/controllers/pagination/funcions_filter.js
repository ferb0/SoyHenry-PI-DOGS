import store from '../../redux/store.js';

export function temperFilter(breeds, temperSelected) {
    if (temperSelected)
        return breeds?.filter(el => el.temper?.some((el) => el.toLowerCase() === temperSelected.toLowerCase()));

    return breeds;
};

export function sourceFilter(breeds, sourceSelected) {
    const constSources = store.getState().configReducer.constSources;
    const ALL = constSources ? constSources.ALL : null;
    const DB = constSources ? constSources.DB : null;
    const API = constSources ? constSources.API : null;

    if (sourceSelected && sourceSelected !== ALL) {
        if (sourceSelected === DB) {
            return breeds?.filter(el => el.source === DB);
        }
        else {
            return breeds?.filter(el => el.source === API);
        }
    }
    else
        return breeds;
};

export function cantFilter(breeds, page = 1, cant) {
    if (breeds.length === 0) return [];
    let array = [];
    let max = (page - 1) * cant + cant;

    if (breeds.length < max)
        max = breeds.length;

    for (let i = (page - 1) * cant; i < max; i++)
        array.push(breeds[i]);

    return array;
};
