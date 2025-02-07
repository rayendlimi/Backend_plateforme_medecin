const express =require('express');

const router = express.Router();
const secretaire = require('../models/secretaire');
const bcrypt =require('bcrypt');
const Medecin = require('../models/medecin');
const authMedecin = require("../middlewares/authMedecin");

const jwt= require('jsonwebtoken');

router.post("/register",authMedecin, async (req, res)=>{

try{

const data = req.body;


 const cin_medecine = req.medecin.cin_medecin;

 
const testtoken = cin_medecine==data.cin_medecin
//test si le medecin connecté fais le register
if(!testtoken)
 {
   res.status(404).send("ce n'est pas votre CIN doctor");

}
// Vérifier si un Secrétaire est déjà assigné à ce Médecin

//const existingSecretaire = await secretaire.findOne({ cin_medecin: data.cin_medecin });
else if (await secretaire.findOne({ cin_medecin: data.cin_medecin })) {
  res.status(400).send("tu es deja un compte pour ta secretaire");
}

else {
newSecretaire = await new secretaire(data)

salt = bcrypt.genSaltSync(10);

newSecretaire.password= bcrypt.hashSync(data.password, salt);

newSecretaire.save()
.then(
    (savedsecretaire)=>{
     
    res.status(200).send(savedsecretaire);}
)
.catch(
    err=>
        {res.status(400).send (err)}
)
   } }
   catch(err){res.status(500).send({message : err.message})}


})



module.exports = router