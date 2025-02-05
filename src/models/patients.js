const mongoose = require('mongoose');

const PatientSchema = new mongoose.Schema({
    id_patient: { type: String, required: true, unique: true },

    CIN: { type: Number, required: true, unique: true },

    nom_patient: { type: String, required: true },

    prenom_patient: { type: String, required: true },

    password: { type: String, required: true },

    date_naissance: { type: Date, required: true },

    telephone: { type: Number, required: true, unique: true }

});

module.exports = mongoose.model('patient', PatientSchema);
