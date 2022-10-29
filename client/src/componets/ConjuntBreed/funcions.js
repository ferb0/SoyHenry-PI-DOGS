import { ALL, API, DB } from '../../global/ConstSource.js'
import { CANT_SUMMARIES } from '../../global/CantSummaries.js'

export function temperFilter(breeds, temperSelected) {
    if (temperSelected)
        return breeds?.filter(el => el.temper?.includes(temperSelected));

    return breeds;
};

export function sourceFilter(breeds, sourceSelected) {
    if (sourceSelected !== ALL) {
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

export function cantFilter(breeds, page = 1, cant = CANT_SUMMARIES) {
    if (breeds.length === 0) return [];
    let array = [];

    for (let i = (page - 1) * cant; i < (page - 1) * cant + cant; i++)
        array.push(breeds[i]);

    return array;
};