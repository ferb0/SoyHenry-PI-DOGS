const { DogM } = require('../../../src/models-mongodb/Dog.js');
const { Dog, Temper } = require('../../db.js');
const { TempersM } = require('../../models-mongodb/Tempers.js');

async function deleteDBM(idBreed) {
    try {
        // Se obtiene dog
        let dog = await DogM.find({ _id: idBreed });
        // Se eliminan tempers        
        dog[0].temper?.map(async el => {
            await TempersM.deleteOne({ _id: el._id });
        });
        // Se elimina dog
        await DogM.deleteOne({ _id: idBreed });
    }
    catch (error) {

    }
};

module.exports = { deleteDBM }