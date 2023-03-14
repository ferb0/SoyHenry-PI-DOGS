require('dotenv').config();
const { Router } = require('express');
const router = Router();

const {getBreedsNumberDataBase} = require('./controllers/data_dase/get_breeds_number_DB.js');

const { NUMBER_MAX_ITEMS_DB } = process.env;

router.get('/breedsNumber', async (req, res) => {
    try {
        let number = 0;
        number = await getBreedsNumberDataBase();

        if (NUMBER_MAX_ITEMS_DB <= number)
            res.json({ msg: true });
        else
            res.json({ msg: false });
    }
    catch (error) {
        res.status(500).json({ err: err.message });
    }
});

module.exports = router;
