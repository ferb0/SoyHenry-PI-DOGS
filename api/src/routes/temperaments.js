const { Router } = require('express');
const router = Router();
const { Temper } = require('../db.js');

const axiosTemperaments = require('../global/axiosInstance.js');

const { MONGODB } = process.env;
const DogM = require('../models-mongodb/Dog.js');

router.get('/', async (req, res) => {
    try {
        // Donde estarán todos los temperamentos
        let temperaments = new Set();

        // Se busca en la API
        let temperamentsAPI = (await axiosTemperaments({ method: 'get', url: 'v1/breeds' })).data;
        temperamentsAPI?.forEach(el => {
            if (el.temperament) {
                el.temperament.split(", ").forEach(el => {
                    temperaments.add(el);
                });
            }
        });

        // Se busca en la BS
        if (MONGODB === 'true') {
            let temperamentsDB = await DogM.find({});
            temperamentsDB?.forEach(el => {
                if (el.temper) {
                    el.temper?.map(temp => temperaments.add(temp))
                }
            });
        }
        else {
            let temperamentsDB = await Temper.findAll({ attributes: ['name'] });
            temperamentsDB?.forEach(el => {
                temperaments.add(el.name);
            });
        }

        res.send({ msg: Array.from(temperaments) });
    }
    catch (e) {
        res.status(500).json({ err: e });
    }
});

module.exports = router;