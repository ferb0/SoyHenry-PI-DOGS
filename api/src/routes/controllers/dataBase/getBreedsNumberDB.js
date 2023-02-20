const { DogM } = require('../../../models-mongodb/Dog.js');
const { Dog } = require('../../../db.js');

async function getBreedsNumberDBM() {
    try {
        return await DogM.find({}).count();
    }
    catch (error) {
        throw error;
    }
};

async function getBreedsNumberDB() {
    try {
        return await Dog.count();
    }
    catch (error) {
        throw error;
    }
};

module.exports = { getBreedsNumberDBM, getBreedsNumberDB }