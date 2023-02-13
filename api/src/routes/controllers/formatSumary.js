// Funciones para darle formato a las respuestas del server.

const { DB, API } = require('../../global/constSource.js');

function formatSummaryAPIServer(breed) {
    // breed es siempre un array
    return breed.map(el => {
        return {
            id: el.id,
            name: el.name,
            weight: el.weight.metric.split(" - "),
            img: el.image.url,
            temper: el.temperament?.split(", "),
            source: API
        }
    });
};

function formatSummaryBDServer(breed) {
    let response = breed?.map(el => {
        let obj = el.get({ plain: true });

        return {
            id: obj.id,
            name: obj.name,
            weight: [String(obj.minWeight), String(obj.maxWeight)],
            img: obj.img,
            temper: obj.Tempers.map(el => el.name),
            source: DB
        };
    });
    return response;
};

function formatSummaryBDServerMDB(breed) {
    return breed?.map(el => {
        return {
            id: el._id,
            name: el.name,
            weight: [String(el.weight[0]), String(el.weight[1])],
            img: el.img,
            temper: el.temper,
            source: DB
        };
    });
};
module.exports = {
    formatSummaryAPIServer,
    formatSummaryBDServer,
    formatSummaryBDServerMDB
}

