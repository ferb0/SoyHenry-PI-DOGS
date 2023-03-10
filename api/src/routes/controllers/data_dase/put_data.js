const { DogM } = require('../../../models_mongodb/dog.js');
const { Dog, Temper } = require('../../../db.js');
const { TempersM } = require('../../../models_mongodb/tempers.js');

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

async function putPDB({ name, height, weight, lifeSpan, img, temper }) {
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