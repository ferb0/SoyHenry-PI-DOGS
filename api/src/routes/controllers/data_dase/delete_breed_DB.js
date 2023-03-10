const { DogM } = require('../../../models_mongodb/dog.js');
const { Dog, Temper, ExcludedBreed } = require('../../../db.js');
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
        await ExcludedBreed.destroy({where: {DogId: idBreed}});
        await Temper.destroy({where: {DogId: idBreed}});
        await Dog.destroy({where: {DogId: idBreed}});
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