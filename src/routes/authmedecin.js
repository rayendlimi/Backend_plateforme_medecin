const express =require('express');

const router = express.Router();
const medecin = require('../models/medecin');
const multer= require('multer');
const bcrypt =require('bcrypt');
const jwt= require('jsonwebtoken');

const storage= multer.diskStorage({
destination: './uploads',
filename: (req, file,redirect) =>
    {
    let date =Date.now();
    let fl = date + '.'+ file.mimetype.split('/')[1];
    //1224565.png(exemple)
    redirect(null,fl);
   const filname =fl;
console.log(filname);
}
})
const upload= multer({storage})
//register
router.post('/register',upload.single('photo_profil'), async (req,res)=>{

    const charactere= "azertyuiopmlkjhgfdsqwxcvbnAZERTYUIOPMLKJHGFDSQWXCVBN";
    let activationcode="";
    for(let i =0;i< 25; i++) {

        activationcode += charactere[Math.floor(Math.random() * charactere.length)]; 
    }
try{
    
const data=req.body;



if (await medecin.findOne({ cin_medecin: data.cin_medecin })) {
    res.status(400).send("cin déjà existe");
}

else if(await medecin.findOne({ numero_licence: data.numero_licence })){
    res.status(400).send("num de liscence déja existe")
                    }
else if(await medecin.findOne({ telephone_personnel: data.telephone_personnel })){
    res.status(400).send("numero de telephone personnel déja existe")

}
else if(await medecin.findOne({ telephone_cabinet: data.telephone_cabinet })){
    res.status(400).send("numero de telephone de cabinet déja existe")

}          
else  {  

Medecin= new medecin(data);
Medecin.activationCode= activationcode;

salt = bcrypt.genSaltSync(10);
Medecin.password= bcrypt.hashSync(data.password, salt);

Medecin.save()
.then(
    (savedMedecin)=>{
         filname=''
    res.status(200).send(savedMedecin);}
)
.catch(
    err=>
        {res.status(400).send (err)}
)}
}
    catch(err){res.status(500).send({message : err.message})};

})


//affiche all medecins
router.get('/all', (req,res)=>{
    medecin.find({})
    .then(
        (Medecin)=>
            {res.status(200).send(Medecin)}
    )
    .catch(
        err=>
            {res.status(400).send (err)}
    )
})

// login medecin
router.post('/login',async (req, res)=>{
try{
let data=req.body;
const verifcin = await medecin.findOne({ cin_medecin: data.cin_medecin });
if (!verifcin ){
    res.status(400).send("cin introuvable")
}

else{

let isPasswordValid = bcrypt.compareSync(data.password, verifcin.password);

        if (isPasswordValid ) {
             if(verifcin.isActive==false){
                res.status(400).send("votre compte n'est pas confirmé , nous avons envoyé un email de confirmation ")
            
            }
            else {
            let payload = {
                cin_medecin: verifcin.cin_medecin,
                password: verifcin.password,  
            };
           
            
            let token = jwt.sign(payload, '123456789'); 

            
            return res.status(200).send({ mytoken: token });}
        }

            else{
                return res.status(400).send("password incorrect");

            }


    }}
catch(err){res.status(500).send({message : err.message})}}

)

router.delete('/deleteAll', async (req, res) => {
    try {
        const result = await medecin.deleteMany({}); // Deletes all documents in the collection
        res.status(200).json({ message: "Tous les médecins ont été supprimés.", deletedCount: result.deletedCount });
    } catch (error) {
        res.status(500).json({ message: "Erreur lors de la suppression.", error });
    }
});

/*    
router.get('/getbyCin/:cin_medecin', (req,res)=>{
    let cin =req.params.cin_medecin;
    medecin.findOne({cin_medecin : cin})
    .then(
        (Medecin)=>
            {res.status(200).send(Medecin)}
    )
    .catch(
        err=>
            {res.status(400).send (err)}
    )
})

router.delete('/supprimer/:id', (req,res)=>{
    let id =req.params.id;
    medecin.findByIdAndDelete({_id : id})
    .then(
        (Medecinsup)=>
            {res.status(200).send(Medecinsup)}
    )
    .catch(
        err=>
            {res.status(400).send (err)}
    )
})
router.put('/update/:id', (req,res)=>{
    data=req.body;
    let id =req.params.id;
    if (filname.length >0){
        data.image=filname;
    }
        
    medecin.findByIdAndUpdate({_id : id}, data)
    .then(
        (Medecinupd)=>
            { filname='';
                res.status(200).send(Medecinupd)}
    )
    .catch(
        err=>
            {res.status(400).send (err)}
    )

})*/
module.exports = router