const mongoose = require('mongoose');
const { temperSchema } = require('./Tempers.js');

const dogSchema = new mongoose.Schema({
    name: String,
    height: [Number],
    weight: [Number],
    lifeSpan: [Number],
    img: String,
    temper: [temperSchema]
});

const DogM = mongoose.model('Dog', dogSchema);

module.exports = { DogM, dogSchema }