const axiosDogs = require('../../../global/axios_instance.js');
const { DogM } = require('../../../models_mongodb/dog.js');
const { Dog, Temper } = require('../../../db.js');
const { TempersM } = require('../../../models_mongodb/tempers.js');

const { SOURCES } = require('../../../global/const_source.js');

const { formatDetail } = require('../format_detail.js');
const { MONGODB } = process.env;

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

async function getDetailPDB(idBreed) {
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

async function getDetailAll(idBreed) {
    try {
        let breed; let format;

        if (!isNaN(idBreed)) {
            breed = await getDetailAPI(idBreed);
            format = SOURCES.API;
        }
        else if (MONGODB === 'active') {
            breed = await getDetailMDB(idBreed);
            format = SOURCES.DBM;
        }
        else {
            breed = await getDetailPDB(idBreed);
            // Se quita metadata
            breed = breed.get({ plain: true });
            format = SOURCES.DB;
        }

        return formatDetail(breed, format);
    } catch (error) {
        throw error;
    }
}
module.exports = { getDetailAll }