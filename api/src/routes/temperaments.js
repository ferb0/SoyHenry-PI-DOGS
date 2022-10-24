const { Router } = require('express');
const router = Router();
const { Temper } = require('../db.js');

const axiosTemperaments = require('../global/axiosInstance.js');

router.get('/', async (req, res) => {
    try {
        // Se busca en la API
        let response = await axiosTemperaments({ method: 'get' });
        let temperamentsApi = new Set();
        response.data.forEach(el => {
            if (el.temperament) {
                el.temperament.split(", ").forEach(el => {
                    temperamentsApi.add(el);
                });
            }
        });
        let allTemperaments = Array.from(temperamentsApi);

        // Se busca en la BS
        let temperamentsBd = await Temper.findAll({attributes: ['name']});
        temperamentsBd.forEach(el => {
            allTemperaments.push(el.name);
        });

        res.send(allTemperaments);
    }
    catch (e) {
        res.status(500).json(e);
    }
});

module.exports = router;