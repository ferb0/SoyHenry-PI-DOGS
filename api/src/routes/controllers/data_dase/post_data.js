const { DogM } = require('../../../models_mongodb/dog.js');
const { Dog, Temper } = require('../../../db.js');
const { ExcludesM } = require('../../../models_mongodb/excluded_breeds.js');
const { TempersM } = require('../../../models_mongodb/tempers.js');

const { MONGODB } = process.env;

async function postMDB({ id, name, height, weight, lifeSpan, img, temper }) {
    try {
        const newDog = new DogM({
            name,
            height: [height[0], height[1]],
            weight: [weight[0], weight[1]],
            lifeSpan: [lifeSpan[0], lifeSpan[1]],
            img
        });
        await newDog.save();

        for (const el of temper) {
            let temp = new TempersM(
                {
                    name: el,
                    dogId: newDog._id.toString()
                });
            temp.save();
        }

        if (id) {
            const newExcludedBreed = new ExcludesM({
                idBreedAPI: id,
                idDog: newDog._id.toString()
            });
            await newExcludedBreed.save();
        }

    }
    catch (error) {
        throw error;
    }
};

async function postPDB({ name, height, weight, lifeSpan, img, temper }) {
    try {
        // Obtener la cantidad de elementos en la tabla.
        const id = await Dog.count();
        // Se crea la raza.
        const newBreed = await Dog.create({
            id,
            name,
            minHeight: height[0],
            maxHeight: height[1],
            minWeight: weight[0],
            maxWeight: weight[1],
            minLifeSpan: lifeSpan[0],
            maxLifeSpan: lifeSpan[1],
            img
        });

        let promiseTempers = temper.map(element => {
            return Temper.create({ name: element });
        });
        let newTempers = await Promise.all(promiseTempers);
        await newBreed.addTempers(newTempers);
    }
    catch (error) {
        throw error;
    }
};

async function postNewBreedDataBase({ id, name, height, weight, lifeSpan, img, temper }) {
    try {
        if (MONGODB === 'active')
            await postMDB({ id, name, height, weight, lifeSpan, img, temper });
        else
            await postPDB({ name, height, weight, lifeSpan, img, temper });
    }
    catch (error) {
        throw error;
    }
}

module.exports = { postNewBreedDataBase }