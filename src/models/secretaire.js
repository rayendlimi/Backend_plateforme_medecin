const mongoose =require('mongoose');

const   SchemaSecretaire=  mongoose.Schema(
    {
        id_secretaire: { type: String, required: true },

        cin_medecin: { type: String, required: true, ref: 'medecin' },

        CIN_secretaire: { type: Number, required: true },

        prenom_secretaire: { type: String, required: true },

        email: { type: String, required: true },

        password: { type: String, required: true },

        telephone: { type: Number, required: true }
    }
)
module.exports=mongoose.model("secretaire", SchemaSecretaire)