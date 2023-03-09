const { DogM } = require('../../../models_mongodb/dog.js');
const { Dog, Temper } = require('../../../db.js');
const { TempersM } = require('../../../models_mongodb/tempers.js');
const { ExcludesM } = require('../../../models_mongodb/excluded_breeds.js');

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