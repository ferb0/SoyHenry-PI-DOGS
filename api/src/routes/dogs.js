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

    try {
        if (idBreed < IDBASE) {
            let response = (await axiosDogs({ method: 'get' })).data;
            let breed = response.find(el => {
                return el.id === parseInt(idBreed);
            });

            res.json(formatDetailAPIServer(breed));
        }
        else {
            let response = await Dog.findOne({
                where: { id: idBreed },
                include: Temper
            });
            // Contar con respuesta null.
            res.json(formatDetailBDServer(response.get({ plain: true })));
        }

    }
    catch (e) {
        res.status(500).json({ msg: e });
    }
});

router.get('/', async (req, res) => {
    let name = req.query.name;

    try {
        let responseAPI = (await axiosDogs({ method: 'get' })).data;

        if (name) {
            // Busqueda y ya filtrado en BD
            let responseDB = await Dog.findAll({
                where: {
                    name: {
                        [Sequelize.Op.iLike]: '%' + name + '%'
                    }
                },
                include: Temper
            });

            // Filtrado en API
            let responseFilteredAPI = responseAPI.filter(el => el.name.toLowerCase().includes(name.toLowerCase()));


            res.json([
                ...formatSummaryAPIServer(responseFilteredAPI),
                ...formatSummaryBDServer(responseDB)
            ]);

        }
        else {
            // Busqueda en BD
            let responseDB = await Dog.findAll({ include: Temper });
            // Búsqueda en API
            res.json([
                ...formatSummaryAPIServer(responseAPI),
                ...formatSummaryBDServer(responseDB)
            ]);
        }
    }
    catch (e) {
        res.status(500).json({ msg: e });
    }
});

router.post('/', async (req, res) => {
    let { name, height, weight, lifeSpan, temper } = req.body;
    try {// Obtener la cantidad de elementos en la tabla.
        const id = await Dog.count();
        // Se crea la raza.
        const newBreed = await Dog.create({ id, name, height, weight, lifeSpan });
        //Se agregan los temperamentos.
        temper.forEach(async element => {
            await newBreed.addTemper(await Temper.create({ name: element }));
        });

        res.send("Ok.");
    }
    catch (e) {
        res.status(500).json({ msg: e });
    }
});

module.exports = router;