const { DogM } = require('../../../../src/models-mongodb/Dog.js');
const { Dog, Temper } = require('../../../db.js');
const { TempersM } = require('../../../models-mongodb/Tempers.js');

async function putDBM({ idBreed, name, height, weight, lifeSpan, img, temper }) {
    try {
        // Se obtiene dog
        let dog = await DogM.findById(idBreed);
        // Se eliminan tempers        
        dog.temper?.map(async el => {
            await TempersM.deleteOne({ _id: el._id });
        });
        // Se elimina dog
        await DogM.deleteOne({ _id: idBreed });

        // Se crea nuevo dog
        const newDog = new DogM(
            {
                name,
                height: [height[0], height[1]],
                weight: [weight[0], weight[1]],
                lifeSpan: [lifeSpan[0], lifeSpan[1]],
                img
            });

        let resultArray = [];
        for (const el of temper) {
            let temp = new TempersM({ name: el });
            resultArray.push(await temp.save());
        }

        resultArray.map(el => newDog.temper.push(el));
        await newDog.save();
    }
    catch (error) {
        throw error;
    }
};

async function putDB({ name, height, weight, lifeSpan, img, temper }) {
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

module.exports = { putDB, putDBM }