const { DogM } = require('../../../models_mongodb/dog.js');
const { Dog } = require('../../../db.js');
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
        let breed = await Dog.findOne({
            where: { id: idBreed }
        });

        await breed.destroy();
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
            await deletePDB(idBreed);
        }
    }
    catch (error) {
        throw error;
    }
}

module.exports = { deleteBreedDataBase }