export function temperFilter(breeds, temperSelected) {
    if (temperSelected)
        return breeds?.filter(el => el.temper?.some((el) => el.toLowerCase() === temperSelected.toLowerCase()));

    return breeds;
};

export function sourceFilter(breeds, sourceSelected) {
    if (sourceSelected) {
        let breedsFiltered = breeds?.filter(el => el.source === sourceSelected);
        // No es lo más eficiente
        // pero no dependo de las constantes que definen el origen de los datos
        if (breedsFiltered.length === 0)
            return breeds;

        return breedsFiltered
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
