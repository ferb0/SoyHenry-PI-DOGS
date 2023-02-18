require('dotenv').config();
const { Router } = require('express');
const router = Router();

const { MONGODB, NUMBER_MAX_ITEMS_DB } = process.env;
// IdBase
const IDBASE = require('../global/idDogsBase.js');
const { DB, API, DBM } = require('../global/constSource.js');

//Funcones para formatos
const { formatDetail } = require('./controllers/formatDetail.js');
const { formatSummaryAPIServer, formatSumary } = require('./controllers/formatSumary.js');
const { checkData } = require('./controllers/checkdataPut.js');
const { getDetailAPI, getDetailMDB, getDetailDB } = require('./controllers/getDataDetail.js');
const { getSumaryAPI, getSumaryDBM, getSumaryDB } = require('./controllers/getDataSumary.js');
const { postDBM, postDB } = require('./controllers/postData.js');
const { getBreedsNumberDBM, getBreedsNumberDB } = require('./controllers/getBreedsNumberDB.js');
const { deleteDBM } = require('./controllers/deleteBreedDB.js');

router.get('/breedsNumber', async (req, res) => {
    try {
        let number = 0;
        if (MONGODB === 'active')
            number = await getBreedsNumberDBM();
        else
            number = await getBreedsNumberDB();

        if (NUMBER_MAX_ITEMS_DB < number)
            res.json({ msg: true });
        else
            res.json({ msg: false });
    }
    catch (error) {
        res.status(500).json({ err: err.message });
    }
});

router.get('/:idBreed', async (req, res) => {
    let idBreed = req.params.idBreed;

    if (!MONGODB === 'active' && !idBreed.match(/^[0-9]+$/))
        return res.status(500).json({ err: "Wrong parameter." });

    try {
        let breed; let format;
        if (idBreed < IDBASE) {
            breed = await getDetailAPI(idBreed);
            format = API;
        }
        else if (MONGODB === 'active') {
            breed = await getDetailMDB(idBreed);
            format = DBM;
        }
        else {
            breed = await getDetailDB(idBreed);
            // Se quita metadata
            breed = breed.get({ plain: true });
            format = DB;
        }
        res.json({ msg: formatDetail(breed, format) });
    }
    catch (e) {
        res.status(500).json({ err: e.message });
    }
});

router.get('/', async (req, res) => {
    let name = req.query.name;

    try {
        let responseFilteredAPI = await getSumaryAPI(name);
        let responseFiltered = formatSummaryAPIServer(responseFilteredAPI);

        if (MONGODB === 'active') {
            let responseFilteredDB = await getSumaryDBM(name);
            responseFiltered = [...responseFiltered, ...formatSumary(responseFilteredDB, DBM)]
        }
        else {
            let responseFilteredDB = await getSumaryDB(name);
            responseFiltered = [...responseFiltered, ...formatSumary(responseFilteredDB, DB)]
        }

        res.json({ msg: responseFiltered });
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
        if (MONGODB === 'active')
            await postDBM({ name, height, weight, lifeSpan, img, temper });
        else
            await postDB({ name, height, weight, lifeSpan, img, temper });

        res.send({ msg: "New race successfully created." });
    }
    catch (e) {
        res.status(500).json({ err: e.message });
    }
});

router.delete('/delete/:idBreed', async (req, res) => {
    const { idBreed } = req.params;

    try {
        if (MONGODB === 'active') {
            await deleteDBM(idBreed);
        }
        else {

        }
        res.json({ msg: `The breed ${idBreed} eliminated.` });
    }
    catch (error) {
        res.status(500).json({ err: e.message });
    }

});

router.put('/', async (req, res) => {
    res.json({ msg: req.body })
});

module.exports = router;