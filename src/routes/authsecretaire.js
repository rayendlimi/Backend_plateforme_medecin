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


// Vérifier si un Secrétaire est déjà assigné à ce Médecin

//const existingSecretaire = await secretaire.findOne({ cin_medecin: data.cin_medecin });
 if (await secretaire.findOne({ cin_medecin: cin_medecine })) {
  res.status(400).send("tu es deja un compte pour ta secretaire");
}

else {
newSecretaire = await new secretaire(data)
newSecretaire.cin_medecin= cin_medecine
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

// login secretaire 
router.post('/login',async (req, res)=>{
try{
let data=req.body;
const verifcin = await secretaire.findOne({ cin_secretaire: data.cin_secretaire });
if (!verifcin ){
    res.status(400).send("cin introuvable")
}

else{

let isPasswordValid = bcrypt.compareSync(data.password, verifcin.password);

        if (isPasswordValid ) {
             
            
            let payload = {
                cin_medecin: verifcin.cin_medecin,
                password: verifcin.password,  
            };
           
            
            let token = jwt.sign(payload, '123456789'); 

            
            return res.status(200).send({ mytoken: token });
        }

            else{
                return res.status(400).send("password incorrect");

            }


    }}
catch(err){res.status(500).send({message : err.message})}}

)



module.exports = router