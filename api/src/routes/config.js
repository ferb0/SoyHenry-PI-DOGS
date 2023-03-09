require('dotenv').config();
const { Router } = require('express');
const router = Router();
const { ConfigM } = require('../models_mongodb/config.js');

router.get('/numberBreedForPage', async (req, res) => {
    try {
        let response = await ConfigM.findOne({}, 'numberBreedsMaxDB');

        res.json({ msg: response.numberBreedsMaxDB });
    }
    catch (e) {
        res.status(500).json({ err: e.message });
    }
});

router.put('/update', async (req, res) => {
    const { numberBreedsMaxDB } = req.body;

    try {
        let config = await ConfigM.findOne();

        config.numberBreedsMaxDB = numberBreedsMaxDB;
        config.save();

        res.json({ msg: 'Update correctly.' });
    }
    catch (e) {
        res.status(500).json({ err: e });
    }
});

module.exports = router;