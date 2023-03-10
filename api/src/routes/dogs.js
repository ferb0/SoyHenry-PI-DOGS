require('dotenv').config();
const { Router } = require('express');
const router = Router();

const { MONGODB, NUMBER_MAX_ITEMS_DB } = process.env;

//Funcones para formatos
const { formatSummaryAPIServer } = require('./controllers/format_sumary.js');
const { checkData } = require('./controllers/checkdata_put.js');
const { getDetailAll } = require('./controllers/data_dase/get_data_detail.js');
const { getSumaryAPI, getSumaryDataBase } = require('./controllers/data_dase/get_data_sumary.js');
const { postNewBreedDataBase } = require('./controllers/data_dase/post_data.js');
const { getBreedsNumberDataBase } = require('./controllers/data_dase/get_breeds_number_DB.js');
const { deleteBreedDataBase } = require('./controllers/data_dase/delete_breed_DB.js');
const { putUpdateBreed } = require('./controllers/data_dase/put_data.js');

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
        let breed = await getDetailAll(idBreed);

        res.json({ msg: breed });
    }
    catch (e) {
        res.status(500).json({ err: e.message });
    }
});

router.get('/', async (req, res) => {
    let name = req.query.name;

    try {
        // Se busca en API
        let responseFilteredAPI = await getSumaryAPI(name);
        responseFilteredAPI = await formatSummaryAPIServer(responseFilteredAPI);

        // Se busca en DB ya formateado
        let responseFilteredDB = await getSumaryDataBase(name);

        responseFiltered = [...responseFilteredAPI, ...responseFilteredDB]

        res.json({ msg: responseFiltered });
    }
    catch (e) {
        res.status(500).json({ err: e.message });
    }
});

router.post('/', async (req, res) => {
    let { id, name, height, weight, lifeSpan, img, temper } = req.body;

    // Chequeo de datos
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
        await postNewBreedDataBase({ id, name, height, weight, lifeSpan, img, temper });
        res.send({ msg: "New race successfully created." });
    }
    catch (e) {
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
        await putUpdateBreed({ idBreed, name, height, weight, lifeSpan, img, temper });

        res.send({ msg: "New race successfully update." });
    }
    catch (e) {
        res.status(500).json({ err: e.message });
    }
});

router.delete('/delete/:idBreed', async (req, res) => {
    const { idBreed } = req.params;

    try {
        await deleteBreedDataBase(idBreed);

        res.json({ msg: `The breed ${idBreed} was eliminated.` });
    }
    catch (error) {
        res.status(500).json({ err: e.message });
    }

});

module.exports = router;