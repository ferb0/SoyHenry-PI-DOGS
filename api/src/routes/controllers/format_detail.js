// Funciones para darle formato a las respuestas del server.
const { SOURCES } = require('../../global/const_source.js');

function formatDetailAPIServer(breed) {
    return breed ? {
        id: breed.id,
        name: breed.name,
        weight: breed.weight.metric.split(" - "),
        height: breed.height.metric.split(" - "),
        lifeSpan: breed.life_span.slice(0, -6).split(" - "),
        img: breed.image.url,
        temper: breed.temperament ? breed.temperament.split(", ") : null,
        source: SOURCES.API
    } : null;
};

function formatDetailBDServer(breed) {
    return breed ? {
        id: breed.id,
        name: breed.name,
        weight: [String(breed.minWeight), String(breed.maxWeight)],
        height: [String(breed.minHeight), String(breed.maxHeight)],
        lifeSpan: [String(breed.minLifeSpan), String(breed.maxLifeSpan)],
        img: breed.img,
        temper: breed.Tempers.map(el => el.name),
        source: SOURCES.DB
    } : null;
};

function formatDetailBDServerMDB(breed) {
    return breed ? {
        id: breed._id,
        name: breed.name,
        weight: [String(breed.weight[0]), String(breed.weight[1])],
        height: [String(breed.height[0]), String(breed.height[1])],
        lifeSpan: [String(breed.lifeSpan[0]), String(breed.lifeSpan[1])],
        img: breed.img,
        temper: breed.temper,
        source: SOURCES.DB
    } : null;
};

function formatDetail(breed, format) {
    if (format === SOURCES.API)
        return formatDetailAPIServer(breed);
    if (format === SOURCES.DB)
        return formatDetailBDServer(breed);
    if (format === SOURCES.DBM)
        return formatDetailBDServerMDB(breed);

    return breed;
};

module.exports = { formatDetail }