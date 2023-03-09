const axiosDogs = require('../../../global/axios_instance.js');
const { DogM } = require('../../../models_mongodb/dog.js');
const { Dog, Temper } = require('../../../db.js');
const { TempersM } = require('../../../models_mongodb/tempers.js');

async function getDetailAPI(idBreed) {
    try {
        let response = (await axiosDogs({ method: 'get', url: 'v1/breeds/' })).data;

        let breed = response.find(el => {
            return el.id === parseInt(idBreed);
        });

        return breed;
    }
    catch (error) {
        throw error;
    }
}

async function getDetailMDB(idBreed) {
    try {
        let breed = await DogM.findById(idBreed);
        breed = breed.toObject();
        let tempers = await TempersM.find({ dogId: idBreed });
        tempers = tempers.map(el => el.name);
        breed.temper = tempers;
        return breed;
    }
    catch (error) {
        throw error;
    }
}

async function getDetailDB(idBreed) {
    try {
        return await Dog.findOne({
            where: { id: idBreed },
            include: Temper
        });
    }
    catch (error) {
        throw error;
    }
}

module.exports = { getDetailAPI, getDetailMDB, getDetailDB }