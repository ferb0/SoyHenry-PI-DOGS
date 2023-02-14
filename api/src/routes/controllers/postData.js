const DogM = require('../../../src/models-mongodb/Dog.js');
const { Dog, Temper } = require('../../db.js');

async function postDBM({ name, height, weight, lifeSpan, img, temper }) {
    try {
        const newDog = new DogM({
            name,
            height: [height[0], height[1]],
            weight: [weight[0], weight[1]],
            lifeSpan: [lifeSpan[0], lifeSpan[1]],
            img,
            temper
        });
        await newDog.save();
    }
    catch (error) {
        throw error;
    }
};

async function postDB({ name, height, weight, lifeSpan, img, temper }) {
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

module.exports = { postDBM, postDB }