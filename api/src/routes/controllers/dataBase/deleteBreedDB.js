const { DogM } = require('../../../models-mongodb/Dog.js');
const { Dog, Temper } = require('../../../db.js');
const { TempersM } = require('../../../models-mongodb/Tempers.js');
const { ExcludesM } = require('../../../models-mongodb/ExcludedBreeds.js');

async function deleteDBM(idBreed) {
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

module.exports = { deleteDBM }