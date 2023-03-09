const mongoose = require('mongoose');

const dogSchema = new mongoose.Schema({
    name: String,
    height: [Number],
    weight: [Number],
    lifeSpan: [Number],
    img: String,
});

const DogM = mongoose.model('Dog', dogSchema);

module.exports = { DogM, dogSchema }