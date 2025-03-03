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

  // affichage by ville
const GetMedecinByville = async (req, res) => {
  try {
    const ville = req.params.ville;

    const medecins = await medecin.find({ ville: ville });

    if (medecins.length === 0) {
        return res.status(404).send("Aucun médecin trouvé dans cette ville");
    }

    res.status(200).send(medecins);
} catch (error) {
    res.status(500).send("Erreur lors de la recherche des médecins");
}
}
// affichage by specialité
const GetMedecinBySpecialite = async (req, res) => {
  try {
    const specialites = req.params.specialite; 

    const medecins = await medecin.find({ specialite: specialites });

  
    if (medecins.length === 0) {
        return res.status(404).send("Aucun médecin trouvé avec cette specialité");
    }

    res.status(200).send(medecins);
} catch (error) {
    res.status(500).send("Erreur lors de la recherche des médecins");
}
}


  module.exports=updateProfile