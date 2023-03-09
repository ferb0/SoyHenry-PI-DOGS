const mongoose = require('mongoose');

const configSchema = new mongoose.Schema({
    numberBreedsMaxDB: Number,
    breedsForPage: Number
});

const ConfigM = mongoose.model('Config', configSchema);

module.exports = { ConfigM, configSchema }
