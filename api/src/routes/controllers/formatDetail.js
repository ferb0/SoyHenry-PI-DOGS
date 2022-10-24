// Funciones para darle formato a las respuestas del server.
const DB = 'DB';
const API = 'API';

function formatDetailAPIServer(breed) {
    return breed ? {
        name: breed.name,
        weight: breed.weight.metric,
        img: breed.image.url,
        source: API,
        height: breed.height.metric,
        life_span: breed.life_span.slice(0, -6),
        temper: breed.temperament.split(", ")
    } : null;
};

function formatDetailBDServer(breed) {
    return breed ? {
        name: breed.name,
        weight: breed.weight,
        img: null,
        source: DB,
        height: breed.height,
        life_span: breed.lifeSpan,
        temper: breed.Tempers.map(el => el.name)
    } : null;
};

module.exports = { formatDetailAPIServer, formatDetailBDServer }