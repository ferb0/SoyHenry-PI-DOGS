// Funciones para darle formato a las respuestas del server.

const { DB, API, DBM } = require('../../global/constSource.js');

function formatSummaryAPIServer(breeds) {
    // breeds es siempre un array
    return breeds.map(el => {
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

function formatSummaryBDServer(breeds) {
    let response = breeds?.map(el => {
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

function formatSummaryBDServerMDB(breeds) {
    return breeds?.map(el => {
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

function formatSumary(breeds, format) {
    if (format === API)
        return formatSummaryAPIServer(breeds);
    if (format === DB)
        return formatSummaryBDServer(breeds);
    if (format === DBM)
        return formatSummaryBDServerMDB(breeds);

    return breeds;
};

module.exports = {
    formatSummaryAPIServer,
    formatSummaryBDServer,
    formatSummaryBDServerMDB,
    formatSumary
}

