const mongoose = require('mongoose');

const temperSchema = new mongoose.Schema({
    name: String,
    dogId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Dog'
    }
});

const TempersM = mongoose.model('Temper', temperSchema);

module.exports = { TempersM, temperSchema }