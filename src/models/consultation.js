const mongoose = require('mongoose');

const ConsultationSchema = new mongoose.Schema({
    id_médecin: { type: String, required: true },
    diagnostic: { type: String, required: true },
    remarque: { type: String },
    rapport: { type: String },
    id_patient: { type: String, required: true },
    date: { type: Date, required: true },
    antécédents: { type: String }
});

module.exports = mongoose.model('consultation', ConsultationSchema);
