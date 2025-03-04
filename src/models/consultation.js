const mongoose = require('mongoose');

const ConsultationSchema = new mongoose.Schema({
    medecin: { type: mongoose.Schema.Types.ObjectId, ref: 'medecin'},
    diagnostic: { type: String, required: true },
    remarque: { type: String },
    rapport: { type: String },
    patient: { type: mongoose.Schema.Types.ObjectId, ref: 'patient'},
    date: { type: Date, required: true },
    antécédents: { type: String }
});

module.exports = mongoose.model('consultation', ConsultationSchema);
