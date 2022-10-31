// Funciones para darle formato a las respuestas del server.

const {DB, API} = require('../../global/constSource.js');

function formatDetailAPIServer(breed) {
    return breed ? {
        id: breed.id,
        name: breed.name,
        weight: breed.weight.metric.split(" - "),
        height: breed.height.metric.split(" - "),
        lifeSpan: breed.life_span.slice(0, -6).split(" - "),
        img: breed.image.url,
        temper: breed.temperament? breed.temperament.split(", "): null,
        source: API
    } : null;
};

function formatDetailBDServer(breed) {
    return breed ? {
        id: breed.id,
        name: breed.name,
        weight: [String(breed.minWeight), String(breed.maxWeight)],
        height: [String(breed.minHeight), String(breed.maxHeight)],
        lifeSpan: [String(breed.minLifeSpan), String(breed.maxLifeSpan)],
        img: null,
        temper: breed.Tempers.map(el => el.name),
        source: DB
    } : null;
};

module.exports = { formatDetailAPIServer, formatDetailBDServer }