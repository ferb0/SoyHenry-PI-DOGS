let mongoose = require('mongoose');

let dogSchema = new mongoose.Schema({
    name: String,
    height: [Number],
    weight: [Number],
    lifeSpan: [Number],
    img: String,
    temper: [String]
});

module.exports = mongoose.model('Dog', dogSchema);