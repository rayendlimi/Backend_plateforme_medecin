const mongoose =require('mongoose');

const   SchemaMedecin=  mongoose.Schema( 
     {
       

    cin_medecin: { type: Number, required: true, unique: true },

    nom: { type: String, required: true },

    prenom: { type: String, required: true },

    numero_licence: { type: Number, required: true, unique: true },

    nom_specialite: { type: String, required: true, ref : 'specialite' },


    telephone_personnel: { type: Number, required: true, unique: true },

    adresse_cabinet: { type: String, required: true },

    telephone_cabinet: { type: Number, required: true , unique: true},

    password: { type: String, required: true },


    photo_profil: { type: String }

       
},
);
module.exports= mongoose.model("medecin", SchemaMedecin)