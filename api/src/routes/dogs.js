const { Router } = require('express');
const router = Router();

const { Dog, Temper } = require('../db.js');
const axiosDogs = require('../global/axiosInstance.js');

// IdBase
const IDBASE = require('../global/idDogsBase.js');
const {
    formatDetailAPIServer,
    formatDetailBDServer
} = require('./controllers/formatDetail.js');

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
            res.json(formatDetailBDServer(response.get({plain: true})));
        }

    }
    catch (e) {
        res.status(500).json(e);
    }
});

router.get('/', async (req, res) => {
    let name = req.query.name;

    try {
        if (name) {
            // Búsqueda en API
            let response = await axiosDogs({
                method: 'get',
                url: '/search',
                params: { q: name }
            });

            // Falta busqueda en BD
            res.json(response.data);
        }
        else {
            let response = await axiosDogs({ method: 'get' });

            res.json(response.data);
        }
    }
    catch (e) {
        res.status(500).json(e);
    }
});

router.post('/', async (req, res) => {
    let { name, height, weight, lifeSpan, temper } = req.body;
    // Obtener la cantidad de elementos en la tabla.
    const id = await Dog.count();
    // Se crea la raza.
    const newBreed = await Dog.create({ id, name, height, weight, lifeSpan });
    //Se agregan los temperamentos.
    temper.forEach(async element => {
        await newBreed.addTemper(await Temper.create({ name: element }));
    });

    res.send("Ok.");

});

module.exports = router;