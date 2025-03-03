const mongoose = require('mongoose');

const rendezvousschema = new mongoose.Schema({
    
    date_rendez_vous: { type: Date, required: true },


    prenom_patient: { type: String, required: true , ref:'patient'},

    nom_patient: { type: String, required: true , ref:'patient'},

    cin_patient: { type: Number, required: true, unique: false, ref :"patient"  },

    telephone: { type: Number, required: true, unique: false, ref :"patient" },

    specialite: { type: String, ref :"medecin" },

    medecin: { type: mongoose.Schema.Types.ObjectId, ref: 'medecin'},


    status: { type: Boolean, default : false }
});

module.exports = mongoose.model('rendezvous', rendezvousschema);
