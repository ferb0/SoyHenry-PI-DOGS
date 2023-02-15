const axiosDogs = require('../../global/axiosInstance.js');
const { DogM } = require('../../models-mongodb/Dog.js');
const { Dog, Temper } = require('../../db.js');

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
        return await DogM.find(
            { name: { $regex: name, $options: 'i' }, },
            'name weight img temper');
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