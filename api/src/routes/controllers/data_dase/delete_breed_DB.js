const { DogM } = require('../../../models_mongodb/dog.js');
const { Dog, Temper } = require('../../../db.js');
const { TempersM } = require('../../../models_mongodb/tempers.js');
const { ExcludesM } = require('../../../models_mongodb/excluded_breeds.js');

const { MONGODB } = process.env;

async function deleteMDB(idBreed) {
    try {
        // Se elimina dog
        await DogM.deleteOne({ _id: idBreed });
        await TempersM.deleteMany({ dogId: idBreed });
        await ExcludesM.deleteOne({ idDog: idBreed });
    }
    catch (error) {
        throw error;
    }
};

async function deletePDB(idBreed) {
    try {
        // Completar
    }
    catch (error) {
        throw error;
    }
};

async function deleteBreedDataBase(idBreed) {
    try {
        if (MONGODB === 'active') {
            await deleteMDB(idBreed);
        }
        else {

        }
    }
    catch (error) {
        throw error;
    }
}

module.exports = { deleteBreedDataBase }