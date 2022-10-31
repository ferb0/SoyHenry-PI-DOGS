const { Router } = require('express');
const router = Router();

const { Sequelize } = require("sequelize");

const { Dog, Temper } = require('../db.js');
const axiosDogs = require('../global/axiosInstance.js');
// IdBase
const IDBASE = require('../global/idDogsBase.js');
//Funcones para formatos
const {
    formatDetailAPIServer,
    formatDetailBDServer
} = require('./controllers/formatDetail.js');
const {
    formatSummaryAPIServer,
    formatSummaryBDServer
} = require('./controllers/formatSumary.js');

router.get('/:idBreed', async (req, res) => {
    let idBreed = req.params.idBreed;

    if (!idBreed.match(/^[0-9]+$/))
    return res.status(500).json({ err: "Wrong parameter." });

    try {
        if (idBreed < IDBASE) {
            let response = (await axiosDogs({ method: 'get' })).data;

            let breed = response.find(el => {
                return el.id === parseInt(idBreed);
            });

            if (!breed)
            return res.status(500).json({ err: "Without results." });

            res.json(formatDetailAPIServer(breed));
        }
        else {
            let response = await Dog.findOne({
                where: { id: idBreed },
                include: Temper
            });

            if (!response)
            return res.status(500).json({ err: "Without results." });

            res.json(formatDetailBDServer(response?.get({ plain: true })));
        }

    }
    catch (e) {
        res.status(500).json({ err: e.message });
    }
});

router.get('/', async (req, res) => {
    let name = req.query.name;

    try {
        let responseAPI = await axiosDogs({ method: 'get' })
        responseAPI = responseAPI.data;

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

        // Busqueda y ya filtrado en BD
        let responseFilteredDB = await Dog.findAll(paramSearch);

        // Filtrado en API
        let responseFilteredAPI = responseAPI.filter(el => {
            if (!name)
                return true;
            else
                return el.name.toLowerCase().includes(name.toLowerCase())
        });


        res.json([
            ...formatSummaryAPIServer(responseFilteredAPI),
            ...formatSummaryBDServer(responseFilteredDB)
        ]);
    }
    catch (e) {
        res.status(500).json({ err: e.message });
    }
});

router.post('/', async (req, res) => {
    let { name, height, weight, lifeSpan, temper } = req.body;
    if (!name || !height || !weight || !lifeSpan || !temper)
        return res.status(500).json({ err: 'Insufficient data.' });

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
            maxLifeSpan: lifeSpan[1]
        });

        let promiseTempers = temper.map(element => {
            return Temper.create({ name: element });
        });
        let newTempers = await Promise.all(promiseTempers);
        await newBreed.addTempers(newTempers);

        res.send({ msg: "New race successfully created." });
    }
    catch (e) {
        res.status(500).json({ err: e.message });
    }
});

module.exports = router;