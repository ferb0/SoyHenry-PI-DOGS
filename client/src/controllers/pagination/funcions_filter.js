import { ALL, API, DB } from '../../global/const_source.js';
import { BREEDS_FOR_PAGE } from '../../global/cant_summaries.js';

export function temperFilter(breeds, temperSelected) {
    if (temperSelected)
        return breeds?.filter(el => el.temper?.some((el) => el.toLowerCase() === temperSelected.toLowerCase()));

    return breeds;
};

export function sourceFilter(breeds, sourceSelected) {
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

export function cantFilter(breeds, page = 1, cant = BREEDS_FOR_PAGE) {
    if (breeds.length === 0) return [];
    let array = [];
    let max = (page - 1) * cant + cant;

    if (breeds.length < max)
        max = breeds.length;

    for (let i = (page - 1) * cant; i < max; i++)
        array.push(breeds[i]);

    return array;
};
