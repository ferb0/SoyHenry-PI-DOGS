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
    const { numberBreedsMaxDB, breedsForPage } = req.body;

    // Control
    if (isNaN(numberBreedsMaxDB))
        return res.status(500).json({ msg: 'numberBreedsMaxDB is not a number.' });
    if (isNaN(breedsForPage))
        return res.status(500).json({ msg: 'breedsForPage is not a number.' });

    try {
        let config = await ConfigM.findOne();

        if (numberBreedsMaxDB)
            config.numberBreedsMaxDB = numberBreedsMaxDB;
        if (breedsForPage)
            config.breedsForPage = breedsForPage;

        config.save();

        res.json({ msg: 'Update correctly.' });
    }
    catch (e) {
        res.status(500).json({ err: e });
    }
});

module.exports = router;