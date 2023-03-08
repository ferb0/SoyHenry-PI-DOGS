const { Router } = require('express');
const router = Router();

const { MONGODB } = process.env;
const { getTempersAPI, getTempersDBM, getTempersDB } = require('./controllers/dataBase/getDataTempers.js');

router.get('/', async (req, res) => {
    try {
        // Se busca en la API
        let temperaments = await getTempersAPI();

        // Se busca en la BS
        if (MONGODB === 'active')
            temperaments = [...temperaments, ... (await getTempersDBM())];
        else
            temperaments = [...temperaments, ... (await getTempersDB())];

        // Se converte en Set para eliminar duplicados.
        res.send({ msg: Array.from(new Set(temperaments)) });
    }
    catch (e) {
        res.status(500).json({ err: e });
    }
});

module.exports = router;