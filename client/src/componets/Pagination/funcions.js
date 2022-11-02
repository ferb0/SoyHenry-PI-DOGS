import { ALL, API, DB } from '../../global/ConstSource.js'
import { CANT_SUMMARIES } from '../../global/CantSummaries.js'
import {ALPHA_ASC, ALPHA_DES, WEIGHT_ASC, WEIGHT_DES} from '../../global/ConstSort.js'

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
    let max = (page - 1) * cant + cant;

    if (breeds.length < max)
        max = breeds.length;

    for (let i = (page - 1) * cant; i < max; i++)
        array.push(breeds[i]);

    return array;
};

export function sortType(breed, sort) {
    breed.sort((first, second) => {

        if (sort === ALPHA_DES) {
            if (first.name < second.name)
                return 1
            if (first.name > second.name)
                return -1
            return 0;
        }

        if (sort === ALPHA_ASC) {
            if (first.name < second.name)
                return -1
            if (first.name > second.name)
                return 1
            return 0;
        }

        if (sort === WEIGHT_DES) {
            // Se calcula el promedio de peso.
            let weightFirst = (first.weight[0] + first.weight[1]) / 2;
            let weightSecond = (second.weight[0] + second.weight[1]) / 2;

            if (weightFirst > weightSecond)
                return -1
            if (weightFirst < weightSecond)
                return 1
            return 0;
        }

        if (sort === WEIGHT_ASC) {
            // Se calcula el promedio de peso.
            let weightFirst = (first.weight[0] + first.weight[1]) / 2;
            let weightSecond = (second.weight[0] + second.weight[1]) / 2;

            if (weightFirst < weightSecond)
                return -1
            if (weightFirst > weightSecond)
                return 1
            return 0;
        }
    });
    return breed;
};