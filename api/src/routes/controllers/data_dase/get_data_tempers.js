const axiosTemperaments = require('../../../global/axios_instance.js');
const { TempersM } = require('../../../models_mongodb/tempers.js');
const { Temper } = require('../../../db.js');

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

        let temperamentsDBM = await TempersM.find({}, 'name');
        temperamentsDBM?.forEach(el => temperaments.add(el.name));

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