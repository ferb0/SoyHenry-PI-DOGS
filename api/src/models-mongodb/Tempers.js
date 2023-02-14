const mongoose = require('mongoose');

const temperSchema = new mongoose.Schema({
    name: String
});

const TempersM = mongoose.model('Temper', temperSchema);

module.exports = { TempersM, temperSchema }