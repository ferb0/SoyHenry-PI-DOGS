const { Router } = require('express');
const router = Router();

const { getTempersAPI, getTempersDataBase } = require('./controllers/data_dase/get_data_tempers.js');

router.get('/', async (req, res) => {
    try {
        // Se busca en la API
        let temperaments = await getTempersAPI();

        // Se busca en la BS
        temperaments = [...temperaments, ...(await getTempersDataBase())];

        // Se converte en Set para eliminar duplicados.
        res.send({ msg: Array.from(new Set(temperaments)) });
    }
    catch (e) {
        res.status(500).json({ err: e });
    }
});

module.exports = router;