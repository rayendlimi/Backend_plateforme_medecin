const mongoose =require('mongoose')

const SchemaSpecialite = mongoose.Schema(
    {
        nom_specialite :{
            type: String, required : true ,  unique: true
        }

    }, { timestamps: true }
)
module.exports= mongoose.model('specialite', SchemaSpecialite)