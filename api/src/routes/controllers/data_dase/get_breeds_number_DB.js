const { DogM } = require('../../../models_mongodb/dog.js');
const { Dog } = require('../../../db.js');

const { MONGODB, NUMBER_MAX_ITEMS_DB } = process.env;

async function getBreedsNumberMDB() {
    try {
        return await DogM.find({}).count();
    }
    catch (error) {
        throw error;
    }
};

async function getBreedsNumberPDB() {
    try {
        return await Dog.count();
    }
    catch (error) {
        throw error;
    }
};

async function getBreedsNumberDataBase() {
    let number = 0;

    if (MONGODB === 'active')
        number = await getBreedsNumberMDB();
    else
        number = await getBreedsNumberPDB();

    return number;
};

module.exports = { getBreedsNumberDataBase }