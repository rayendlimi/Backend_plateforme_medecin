const mongoose =require('mongoose');

const   SchemaSecretaire=  mongoose.Schema(
    {
      
        cin_secretaire: { type: Number, required: true, unique : true },
        
        cin_medecin: { type: Number, required: true, unique: true, ref: 'medecin' },
        
        prenom_secretaire: { type: String, required: true },

        nom_secretaire: { type: String, required: true },

        password: { type: String, required: true },

        telephone: { type: Number, required: true }
    }
)
module.exports=mongoose.model("secretaire", SchemaSecretaire)