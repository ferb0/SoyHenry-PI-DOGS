const mongoose = require('mongoose');

const excludesSchema = new mongoose.Schema({
    breed: Number
});

const ExcludesM = mongoose.model('Excludes', excludesSchema);

module.exports = { ExcludesM, excludesSchema }