const { DogM } = require('../../../models_mongodb/dog.js');
const { Dog, Temper, ExcludedBreed } = require('../../../db.js');
const { TempersM } = require('../../../models_mongodb/tempers.js');

const { deleteBreedDataBase } = require('./delete_breed_DB.js');
const { postNewBreedDataBase } = require('./post_data.js');

const { MONGODB } = process.env;

async function putMDB({ idBreed, name, height, weight, lifeSpan, img, temper }) {
    try {
        // Se obtiene dog
        let dog = await DogM.findById(idBreed);
        // Se eliminan tempers
        await TempersM.deleteMany({ dogId: dog._id.toString() });

        // Se edita dog
        dog.name = name;
        dog.height = [height[0], height[1]];
        dog.weight = [weight[0], weight[1]];
        dog.lifeSpan = [lifeSpan[0], lifeSpan[1]];
        dog.img = img;

        dog.save();

        for (const el of temper) {
            let temp = new TempersM({ name: el, dogId: dog._id.toString() });
            temp.save();
        }
    }
    catch (error) {
        throw error;
    }
};

async function putPDB({ idBreed, name, height, weight, lifeSpan, img, temper }) {
    try {
        // Se busca la raza para obtener el id de la api a la que esta sustituyendo si existe
        let excludedBreed = await ExcludedBreed.findOne({ where: { DogId: idBreed } });
        let id = null;
        if (excludedBreed)
            id = excludedBreed.idBreedAPI;

        // Se elimina breed totalmente
        await deleteBreedDataBase(idBreed);

        // Se crea breed
        console.log({ id, name, height, weight, lifeSpan, img, temper })
        await postNewBreedDataBase({ id, name, height, weight, lifeSpan, img, temper });
    }
    catch (error) {
        throw error;
    }
};

async function putUpdateBreed({ idBreed, name, height, weight, lifeSpan, img, temper }) {
    try {
        if (MONGODB === 'active')
            await putMDB({ idBreed, name, height, weight, lifeSpan, img, temper });
        else
            await putPDB({ idBreed, name, height, weight, lifeSpan, img, temper });
    }
    catch (error) {
        throw error;
    }
};

module.exports = { putUpdateBreed }