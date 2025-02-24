const jwt = require("jsonwebtoken");
const Medecin = require("../../models/medecin");
const Secretaire = require("../../models/secretaire");
const Patient = require("../../models/patients");
const bcrypt = require("bcrypt");
const admin = require("../../models/admin");

const generateTokens = (user, role) => {
  const accessToken = jwt.sign(
    { userId: user._id, role },
    "123456789",
    { expiresIn: "120m" } // Short-lived access token
  );

  const refreshToken = jwt.sign(
    { userId: user._id, role },
    "123456789",
    { expiresIn: "7d" } // Long-lived refresh token
  );

  return { accessToken, refreshToken };
};

const login = async (req, res) => {
  const data = req.body;

  let utilisateur;
  let role;

  // Vérification dans Medecin
  if (await Medecin.findOne({ cin_medecin: data.cin_medecin })) {
    utilisateur = await Medecin.findOne({ cin_medecin: data.cin_medecin });

  }
    // Vérification dans Secretaire
   else if (await Secretaire.findOne({ cin_secretaire: data.cin_secretaire })) {
      utilisateur = await Secretaire.findOne({ cin_secretaire: data.cin_secretaire });
    } 
    

      // Vérification dans Patient
      else if (await Patient.findOne({ cin_patient: data.cin_patient })) {
        utilisateur = await Patient.findOne({ cin_patient: data.cin_patient });
      
      }
      // Vérification dans Admin
     else if (await admin.findOne({ username: data.username })) {
        utilisateur = await admin.findOne({ username: data.username });
    
      }

     else {
        return res.status(401).send({ message: "utilisateur non trouvé" });
          }
    
   
if(utilisateur.isActive==true){
  if (!bcrypt.compareSync(data.password, utilisateur.password)) {
    return res.status(401).json({ message: "password incorrect" });
  }

  const { accessToken, refreshToken } = generateTokens(utilisateur, utilisateur.role);
console.log(utilisateur.role)
  utilisateur.refreshToken = refreshToken;
console.log(utilisateur.refreshToken);
  await utilisateur.save();

  res.json({ accessToken, refreshToken});}
  else{
    return res.send({message : "nous avons envoyé un email de verification a vous, merci de verifier votre compte   "})
  }
};

module.exports = login;
