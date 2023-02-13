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
    formatDetailBDServer,
    formatDetailBDServerMDB
} = require('./controllers/formatDetail.js');
const {
    formatSummaryAPIServer,
    formatSummaryBDServer,
    formatSummaryBDServerMDB
} = require('./controllers/formatSumary.js');

const { checkData } = require('./controllers/checkdataPut.js');

const { MONGODB } = process.env;
let DogM = require('../../src/models-mongodb/Dog.js');

router.get('/:idBreed', async (req, res) => {
    let idBreed = req.params.idBreed;

    if (!MONGODB === 'true' && !idBreed.match(/^[0-9]+$/))
        return res.status(500).json({ err: "Wrong parameter." });

    try {
        if (idBreed < IDBASE) {
            let response = (await axiosDogs({ method: 'get', url: 'v1/breeds/' })).data;

            let breed = response.find(el => {
                return el.id === parseInt(idBreed);
            });

            if (!breed)
                return res.status(500).json({ err: "Without results." });

            res.json({ msg: formatDetailAPIServer(breed) });
        }
        else if (MONGODB === 'true') {
            let breed = (await DogM.findById(idBreed));
            res.json({ msg: formatDetailBDServerMDB(breed) });
        }
        else {
            let response = await Dog.findOne({
                where: { id: idBreed },
                include: Temper
            });

            if (!response)
                return res.status(500).json({ err: "Without results." });

            res.json({ msg: formatDetailBDServer(response?.get({ plain: true })) });
        }

    }
    catch (e) {
        res.status(500).json({ err: e.message });
    }
});

router.get('/', async (req, res) => {
    let name = req.query.name;

    try {
        let responseAPI = await axiosDogs({ method: 'get', url: 'v1/breeds' })
        responseAPI = responseAPI.data;

        let responseFilteredDB;

        if (MONGODB === 'true') {
            responseFilteredDB = await DogM.find(
                { name: { $regex: name, $options: 'i' }, },
                'name weight img temper');
            responseFilteredDB = formatSummaryBDServerMDB(responseFilteredDB)
        }
        else {
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
            responseFilteredDB = await Dog.findAll(paramSearch);
            // Se unifica formato
            responseFilteredDB = formatSummaryBDServer(responseFilteredDB)
        }

        // Filtrado en API
        let responseFilteredAPI = responseAPI.filter(el => {
            if (!name)
                return true;
            else
                return el.name.toLowerCase().includes(name.toLowerCase())
        });


        res.json({
            msg: [...formatSummaryAPIServer(responseFilteredAPI),
            ...responseFilteredDB]
        });
    }
    catch (e) {
        res.status(500).json({ err: e.message });
    }
});

router.post('/', async (req, res) => {
    let { name, height, weight, lifeSpan, img, temper } = req.body;

    if (!name || !height || !weight || !lifeSpan || !temper)
        return res.status(500).json({ err: 'Insufficient data.' });

    if (img && !img.match(/^http/))
        return res.status(500).json({ err: 'Bad format image.' });

    if (!Array.isArray(temper))
        return res.status(500).json({ err: 'Bad format temper.' });

    // Se convierte en numeros.
    height = height.map(Number);
    weight = weight.map(Number);
    lifeSpan = lifeSpan.map(Number);

    // Convertir primera letra en mayúscula.
    temper = temper.map((el) => {
        return el.charAt(0).toUpperCase() + el.slice(1);
    });

    // Se chequea consistencia.
    let responseCheck = checkData(height, weight, lifeSpan);
    if (responseCheck) {
        return res.status(500).json({ err: responseCheck });
    }

    try {
        if (MONGODB === 'true') {
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
        else {        // Obtener la cantidad de elementos en la tabla.
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

        res.send({ msg: "New race successfully created." });
    }
    catch (e) {
        res.status(500).json({ err: e.message });
    }
});

module.exports = router;