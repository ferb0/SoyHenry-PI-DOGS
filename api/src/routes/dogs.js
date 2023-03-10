require('dotenv').config();
const { Router } = require('express');
const router = Router();

const { MONGODB, NUMBER_MAX_ITEMS_DB } = process.env;
// IdBase
const IDBASE = require('../global/id_dogs_base.js');
const { DB, API, DBM } = require('../global/const_source.js');

//Funcones para formatos
const { formatDetail } = require('./controllers/format_detail.js');
const { formatSummaryAPIServer, formatSumary } = require('./controllers/format_sumary.js');
const { checkData } = require('./controllers/checkdata_put.js');
const { getDetailAPI, getDetailMDB, getDetailDB } = require('./controllers/data_dase/get_data_detail.js');
const { getSumaryAPI, getSumaryDBM, getSumaryDB } = require('./controllers/data_dase/get_data_sumary.js');
const { postDBM, postDB } = require('./controllers/data_dase/post_data.js');
const { getBreedsNumberDataBase } = require('./controllers/data_dase/get_breeds_number_DB.js');
const { deleteDBM } = require('./controllers/data_dase/delete_breed_DB.js');
const { putDBM, putDB } = require('./controllers/data_dase/put_data.js');

router.get('/breedsNumber', async (req, res) => {
    try {
        let number = 0;
        number = getBreedsNumberDataBase();

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
        let responseFiltered = await formatSummaryAPIServer(responseFilteredAPI);

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
    let { id, name, height, weight, lifeSpan, img, temper } = req.body;

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
            await postDBM({ id, name, height, weight, lifeSpan, img, temper });
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

router.put('/update/:idBreed', async (req, res) => {
    const { idBreed } = req.params;
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
            await putDBM({ idBreed, name, height, weight, lifeSpan, img, temper });
        else
            await putDB({ idBreed, name, height, weight, lifeSpan, img, temper });

        res.send({ msg: "New race successfully update." });
    }
    catch (e) {
        res.status(500).json({ err: e.message });
    }
});

module.exports = router;