const express =require('express');

const router = express.Router();
const patients = require('../models/patients');
const bcrypt =require('bcrypt');
const jwt= require('jsonwebtoken');
const sendVerificationEmail = require('../nodemailer/verifemail');

router.post("/register", async (req, res)=>{
    const charactere = "azertyuiopmlkjhgfdsqwxcvbnAZERTYUIOPMLKJHGFDSQWXCVBN";
    let activationCode = "";
    for (let i = 0; i < 25; i++) {
        activationCode += charactere[Math.floor(Math.random() * charactere.length)];
    }
try{
const data= req.body;

if (await patients.findOne({cin_patient: data.cin_patient}))
    {
        res.status(400).send("cin déjà existe");
    }

else if (await patients.findOne({ telephone: data.telephone }))
    {
    res.status(401).send("numéro de telephone déja existe")
    }
else
{
let Patient= new patients(data)
Patient.activationCode = activationCode;

salt = bcrypt.genSaltSync(10);

Patient.password= bcrypt.hashSync(data.password, salt);

await Patient.save();
await sendVerificationEmail(Patient.email,"authpatient", Patient.activationCode);
res.status(200).send({ message: "Inscription réussie. Vérifiez votre email pour activer votre compte.", patient: Patient });


}
}

catch(err){
    res.status(500).send({message : err.message})
          };

})

//verif email patient

router.post('/verifpatient/:activationcode',async (req,res)=>{
    try{
    let actifcode =req.params.activationcode;
    const recherche=await patients.findOne({activationCode : actifcode})
            console.log(actifcode)
        if( !recherche){
                res.status(400).send("ce code d'activation est faut")
                  }
        else{
            recherche.isActive=true; 
            recherche.save()
            res.status(200).send("Le compte est activé avec succées")

         }
                         
    }
    catch(err){res.status(500).send({message : err.message})}


})





//login patient
router.post('/login',async (req, res)=>{
try{
let data=req.body;
const verifcin = await patients.findOne({ cin_patient: data.cin_patient });
if (!verifcin){
    res.status(400).send("cin introuvable")
}else{

let isPasswordValid = bcrypt.compareSync(data.password, verifcin.password);

        if (isPasswordValid) {
            
            let payload = {
                cin_patient: verifcin.cin_patient,
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
module.exports= router