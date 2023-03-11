const { DogM } = require('../../../models_mongodb/dog.js');
const { Dog } = require('../../../db.js');

const { MONGODB } = process.env;

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
    try {
        let number = 0;

        if (MONGODB === 'active')
            number = await getBreedsNumberMDB();
        else
            number = await getBreedsNumberPDB();

        return number;
    }
    catch (error) {
        throw error;
    }
};

module.exports = { getBreedsNumberDataBase }