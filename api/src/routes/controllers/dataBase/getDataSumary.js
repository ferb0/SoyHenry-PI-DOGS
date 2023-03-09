const axiosDogs = require('../../../global/axios_instance.js');
const { DogM } = require('../../../models_mongodb/dog.js');
const { TempersM } = require('../../../models_mongodb/tempers.js');
const { Dog, Temper } = require('../../../db.js');

async function getSumaryAPI(name) {
    try {
        let responseAPI = await axiosDogs({ method: 'get', url: 'v1/breeds' })
        responseAPI = responseAPI.data
        // Filtrado en API
        let responseFilteredAPI = responseAPI.filter(el => {
            if (!name)
                return true;
            else
                return el.name.toLowerCase().includes(name.toLowerCase())
        });

        return responseFilteredAPI;
    } catch (error) {
        throw error;
    }
};

async function getSumaryDBM(name) {
    try {
        let breeds = await DogM.find(
            { name: { $regex: name, $options: 'i' }, },
            'name weight img'
        );
        breeds = breeds.map(el => el.toObject());

        let completeBreeds = [];
        for (const el of breeds) {
            let tempers = await TempersM.find({ dogId: el._id.toString() });
            tempers = tempers.map(el => el.name);
            completeBreeds.push({ ...el, temper: tempers })
        }

        return completeBreeds;
    } catch (error) {
        throw error;
    }
};

async function getSumaryDB(name) {
    try {
        if (name) {
            var paramSearch = {
                where: {
                    name: {
                        [Sequelize.Op.iLike]: '%' + name + '%'
                    }
                },
                include: Temper
            };
        }
        else {
            var paramSearch = { include: Temper };
        }
        return await Dog.findAll(paramSearch);
    } catch (error) {
        throw error;
    }
};

module.exports = { getSumaryAPI, getSumaryDBM, getSumaryDB }