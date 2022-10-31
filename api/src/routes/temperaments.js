const { Router } = require('express');
const router = Router();
const { Temper } = require('../db.js');

const axiosTemperaments = require('../global/axiosInstance.js');

router.get('/', async (req, res) => {
    try {
        // Se busca en la API
        let temperamentsAPI = (await axiosTemperaments({ method: 'get' })).data;
        
        let temperaments = new Set();
        temperamentsAPI?.forEach(el => {
            if (el.temperament) {
                el.temperament.split(", ").forEach(el => {
                    temperaments.add(el);
                });
            }
        });

        // Se busca en la BS
        let temperamentsBd = await Temper.findAll({ attributes: ['name'] });
        temperamentsBd?.forEach(el => {
            temperaments.add(el.name);
        });

        res.send(Array.from(temperaments));
    }
    catch (e) {
        res.status(500).json({ err: e });
    }
});

module.exports = router;