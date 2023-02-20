const { DogM } = require('../../../models-mongodb/Dog.js');
const { Dog, Temper } = require('../../../db.js');
const { TempersM } = require('../../../models-mongodb/Tempers.js');

async function deleteDBM(idBreed) {
    try {
        // Se elimina dog
        await DogM.deleteOne({ _id: idBreed });
        await TempersM.deleteMany({dogId: idBreed});
    }
    catch (error) {

    }
};

module.exports = { deleteDBM }