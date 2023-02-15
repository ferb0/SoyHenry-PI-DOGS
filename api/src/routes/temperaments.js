const { Router } = require('express');
const router = Router();

const { MONGODB } = process.env;
const { getTempersAPI, getTempersDBM, getTempersDB } = require('./controllers/getDataTempers.js');

router.get('/', async (req, res) => {
    try {
        // Se busca en la API
        let temperaments = await getTempersAPI();

        // Se busca en la BS
        if (MONGODB === 'active') {
            temperaments = [...temperaments, ... (await getTempersDBM())];
        }
        else {
            temperaments = [...temperaments, ... (await getTempersDB())];
        }
        res.send({ msg: temperaments });
    }
    catch (e) {
        res.status(500).json({ err: e });
    }
});

module.exports = router;