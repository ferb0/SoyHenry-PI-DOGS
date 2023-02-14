const axiosTemperaments = require('../../global/axiosInstance.js');
const DogM = require('../../models-mongodb/Dog.js');
const { Temper } = require('../../db.js');

async function getTempersAPI() {
    try {
        let temperaments = new Set();

        let temperamentsAPI = (await axiosTemperaments({ method: 'get', url: 'v1/breeds' })).data;
        temperamentsAPI?.forEach(el => {
            if (el.temperament) {
                el.temperament.split(", ").forEach(el => {
                    temperaments.add(el);
                });
            }
        });

        return Array.from(temperaments);
    }
    catch (error) {
        throw error;
    }
}

async function getTempersDBM() {
    try {
        let temperaments = new Set();

        let temperamentsDB = await DogM.find({}, 'temper');
        temperamentsDB?.forEach(el => {
            if (el.temper) {
                el.temper?.map(temp => temperaments.add(temp))
            }
        });

        return Array.from(temperaments);
    }
    catch (error) {
        throw error;
    }
}

async function getTempersDB() {
    try {
        let temperaments = new Set();

        let temperamentsDB = await Temper.findAll({ attributes: ['name'] });
        temperamentsDB?.forEach(el => {
            temperaments.add(el.name);
        });

        return Array.from(temperaments);
    }
    catch (error) {
        throw error;
    }
}

module.exports = { getTempersAPI, getTempersDBM, getTempersDB }