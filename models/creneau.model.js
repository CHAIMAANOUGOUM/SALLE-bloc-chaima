const mongoose = require('mongoose');
const { Schema } = require('mongoose');
var creneauSchema = new mongoose.Schema({

    heure_debut: {
        type: String,

    },
    heure_fin: {
        type: String
    }




});
mongoose.model('Creneau', creneauSchema);