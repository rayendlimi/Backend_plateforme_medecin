const mongoose = require('mongoose');

const ConsultationSchema = new mongoose.Schema({
    medecin: { type: mongoose.Schema.Types.ObjectId, ref: 'medecin'},
    cin_patient:{type: Number, ref: 'patient'},
    diagnostic: { type: String, required: true },
    type_consyltation: { type: String, required: true },
    remarque: { type: String },
    rapport: { type: String },
    patient: { type: mongoose.Schema.Types.ObjectId, ref: 'patient'},
    date: { type: Date, required: true },
    antécédents: { type: String }
},
{ timestamps: true });

module.exports = mongoose.model('consultation', ConsultationSchema);
