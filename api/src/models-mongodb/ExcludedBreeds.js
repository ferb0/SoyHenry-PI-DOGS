const mongoose = require('mongoose');

const excludesSchema = new mongoose.Schema({
    idBreedAPI: Number,
    idDog: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Dog'
    }
});

const ExcludesM = mongoose.model('Excludes', excludesSchema);

module.exports = { ExcludesM, excludesSchema }