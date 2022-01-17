const mongoose = require('mongoose');
const { Schema } = require('mongoose');
var occupationSchema = new mongoose.Schema({

    date: {
        type: Date,

    },
    creneau: { type: Schema.Types.ObjectId, ref: 'Creneau' },
    nameCreneau: {
        type: String

    },
    salle: { type: Schema.Types.ObjectId, ref: 'Salle' },
    nameSalle: {
        type: String
    }




});
mongoose.model('Occupation', occupationSchema);