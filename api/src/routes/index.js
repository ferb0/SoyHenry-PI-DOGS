const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const dogs = require('./dogs.js');
const temperaments = require('./temperaments.js');
const config = require('./config.js');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.use('/dogs', dogs);
router.use('/temperaments', temperaments);
router.use('/config', config);

router.get('/', (req, res) => {
    res.status(200).send("Nada para mostar.");
});

module.exports = router;
