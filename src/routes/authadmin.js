const express =require('express');

const router = express.Router();
const admin = require('../models/admin');
const bcrypt =require('bcrypt');
const jwt= require('jsonwebtoken');

router.post("/registeradmin", async (req, res)=>{
try{
const data= req.body;

if (await admin.findOne({username: data.username}))
    {
        res.status(400).send("username déjà existe");
    }

else if (await admin.findOne({ email: data.email }))
    {
    res.status(401).send("email déja existe")
    }
else
{
admins= new admin(data)

salt = bcrypt.genSaltSync(10);

admins.password= bcrypt.hashSync(data.password, salt);

admins.save()
.then(
    (savedadmin)=>{
     
    res.status(200).send(savedadmin);}
)
.catch(
    err=>
        {res.status(400).send (err)}
)}
}

catch(err){
    res.status(500).send({message : err.message})
          };

})
router.post('/loginadmin',async (req, res)=>{
try{
let data=req.body;
const verifuser = await admin.findOne({ username: data.username });
if (!verifuser){
    res.status(400).send("username introuvable")
}
else{

let isPasswordValid = bcrypt.compareSync(data.password, verifuser.password);

        if (isPasswordValid) {
            
            let payload = {
                username: verifuser.username,
                password: verifuser.password,  
            };

            
            let token = jwt.sign(payload, '0123456789'); 

            
            return res.status(200).send({ mytoken: token });
        }

            else{
                return res.status(400).send("password incorrect");

            }


    }}
catch(err){res.status(500).send({message : err.message})}}

)


module.exports= router