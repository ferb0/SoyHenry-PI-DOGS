// Funciones para darle formato a las respuestas del server.

const { SOURCES } = require('../../global/const_source.js');
const { ExcludesM } = require('../../models_mongodb/excluded_breeds.js');
const { ExcludedBreed } = require('../../db.js');

const { MONGODB } = process.env;

async function filterExcludedBreed(breeds) {
    try {
        let results;
        if (MONGODB === 'active')
            results = await ExcludesM.find({});
        else
            results = await ExcludedBreed.findAll();

        breeds = breeds.filter(el => {
            for (const elRe of results) {
                if (el.id === elRe.idBreedAPI)
                    return false;
            }
            return true;
        });

        return breeds;
    }
    catch (error) {
        console.log('ERROR en filtro de breeds API: ', error)
        return breeds;
    }
};

async function formatSummaryAPIServer(breeds) {
    // se filtran breeds.
    let filteredBreeds = await filterExcludedBreed(breeds);
    // Se da formato
    return filteredBreeds.map(el => {
        return {
            id: el.id,
            name: el.name,
            weight: el.weight.metric.split(" - "),
            img: el.image.url,
            temper: el.temperament?.split(", "),
            source: SOURCES.API
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
            source: SOURCES.DB
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
            source: SOURCES.DB
        };
    });
};

function formatSumary(breeds, format) {
    if (format === SOURCES.API)
        return formatSummaryAPIServer(breeds);
    if (format === SOURCES.DB)
        return formatSummaryBDServer(breeds);
    if (format === SOURCES.DBM)
        return formatSummaryBDServerMDB(breeds);

    return breeds;
};

module.exports = {
    formatSummaryAPIServer,
    formatSummaryBDServer,
    formatSummaryBDServerMDB,
    formatSumary
}
