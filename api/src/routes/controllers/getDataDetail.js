const axiosDogs = require('../../global/axiosInstance.js');
const { DogM } = require('../../models-mongodb/Dog.js');
const { Dog, Temper } = require('../../db.js');

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
        breed.temper = breed.temper?.map(el => el.name);
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