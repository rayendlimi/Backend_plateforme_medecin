const mongoose =require('mongoose')

const SchemaSpecialite = mongoose.Schema(
    {
        nomSpecialite :{
            type: String, required : true ,  unique: true
        }

    }
)
module.exports= mongoose.model('specialite', SchemaSpecialite)