import { ALPHA_ASC, ALPHA_DES, WEIGHT_ASC, WEIGHT_DES } from '../../global/ConstSort.js';

export function sortType(breed, sort) {

    if (sort === ALPHA_DES) {
        breed.sort((first, second) => {
            if (first.name.toLowerCase() < second.name.toLowerCase())
                return 1
            if (first.name.toLowerCase() > second.name.toLowerCase())
                return -1
            return 0;
        })

        return breed;
    }

    if (sort === ALPHA_ASC) {
        breed.sort((first, second) => {
            if (first.name.toLowerCase() < second.name.toLowerCase())
                return -1
            if (first.name.toLowerCase() > second.name.toLowerCase())
                return 1

            return 0;
        });

        return breed;
    }

    if (sort === WEIGHT_DES) {
        for (let i = 0; i < breed.length - 1; i++) {
            for (let j = i + 1; j < breed.length; j++) {
                let weightFirst = (breed[i].weight[0] + breed[i].weight[1]) / 2;
                let weightSecond = (breed[j].weight[0] + breed[j].weight[1]) / 2;
                if (weightFirst < weightSecond) {
                    let tmp = breed[i];
                    breed[i] = breed[j];
                    breed[j] = tmp;
                }
            }
        }
        return breed;
    }

    if (sort === WEIGHT_ASC) {
        for (let i = 0; i < breed.length - 1; i++) {
            for (let j = i + 1; j < breed.length; j++) {
                let weightFirst = (breed[i].weight[0] + breed[i].weight[1]) / 2;
                let weightSecond = (breed[j].weight[0] + breed[j].weight[1]) / 2;
                if (weightFirst > weightSecond) {
                    let tmp = breed[i];
                    breed[i] = breed[j];
                    breed[j] = tmp;
                }
            }
        }
        return breed;
    }
};
