const mongoose = require('mongoose');
const DossierSchema = new mongoose.Schema({
    rapport: { type: String, default: "" },
    patient: { type: mongoose.Schema.Types.ObjectId, ref: 'patient'},
    antécédents: { type: String, default :"" }
});

module.exports = mongoose.model('dossier-medical', DossierSchema);
