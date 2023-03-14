export function objectToArraySources(obj) {
    let array = [];

    for (const key in obj)
        array.push(obj[key])

    return array;
};
