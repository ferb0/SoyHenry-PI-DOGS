// Funciones para darle formato a las respuestas del server.
const DB = 'DB';
const API = 'API';

function formatDetailAPIServer(breed) {
    return breed ? {
        name: breed.name,
        weight: breed.weight.metric,
        height: breed.height.metric,
        life_span: breed.life_span.slice(0, -6),
        img: breed.image.url,
        temper: breed.temperament.split(", "),
        source: API
    } : null;
};

function formatDetailBDServer(breed) {
    return breed ? {
        name: breed.name,
        weight: breed.weight,
        height: breed.height,
        life_span: breed.lifeSpan,
        img: null,
        temper: breed.Tempers.map(el => el.name),
        source: DB
    } : null;
};

module.exports = { formatDetailAPIServer, formatDetailBDServer }