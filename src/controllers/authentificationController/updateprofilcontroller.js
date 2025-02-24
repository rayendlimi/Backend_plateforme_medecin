const secretaire = require("../../models/secretaire");
const admin  = require("../../models/admin");
const patient = require("../../models/patients");
const medecin = require("../../models/medecin");
const bcrypt = require("bcrypt");
const updateProfile= async (req, res)=> {
    try{
       const data =req.body;
    
      let utilisateur;
    
      if (req.user.role=="medecin") {
         utilisateur = await medecin.findOne({ _id: req.user.userId });
      } 
      else if(req.user.role=="secretaire") {
        utilisateur = await secretaire.findOne({ _id:req.user.userId });
      } 
       else if(req.user.role=="patient") {
        utilisateur = await patient.findOne({ _id:req.user.userId });
      } 
       else if(req.user.role=="admin") {
        utilisateur = await admin.findOne({ _id:req.user.userId });
      }
       
      
      if(data.password ){
        data.password = bcrypt.hashSync(data.password, bcrypt.genSaltSync(10));
        utilisateur.password=data.password
      }
  for(key in data){
    if(utilisateur[key]!=="undefined"){
      
  utilisateur[key]= data[key];
        await utilisateur.save();
  
    }
    
     }
  
    
      res.status(200).json({ message: "Profile updated successfully", utilisateur });
      
  }
    catch (error) {
      res.status(500).json({ message: "erreur de modification", error });
    }
  }
  module.exports=updateProfile