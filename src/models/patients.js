const mongoose = require('mongoose');

const PatientSchema = new mongoose.Schema({

    cin_patient: { type: Number, required: true, unique: true },

    nom_patient: { type: String, required: true },

    prenom_patient: { type: String, required: true },

    sex: { type: String,},
    
    password: { type: String, required: true },

    date_naissance: { type: Date, required: true },

    email : {type:String, required : true},

    telephone: { type: Number, required: true, unique: true },

    isActive : {type : Boolean, default: true},
    role:{type : String, default: 'patient'},

    activationCode: {type : String}
    
}, 
{ timestamps: true }
);

module.exports = mongoose.model('patient', PatientSchema);
