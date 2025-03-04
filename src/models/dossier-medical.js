const mongoose = require('mongoose');
const DossierSchema = new mongoose.Schema({
    rapport: { type: String },
    patient: { type: mongoose.Schema.Types.ObjectId, ref: 'patient'},
    antécédents: { type: String }
});

module.exports = mongoose.model('dossier-medical', DossierSchema);
