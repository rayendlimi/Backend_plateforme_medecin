const medecin = require("../../models/medecin");
const bcrypt = require("bcrypt");
const sendVerificationEmail = require("../../nodemailer/verifemail");

const register = async (req, res) => {


  const charactere = "azertyuiopmlkjhgfdsqwxcvbnAZERTYUIOPMLKJHGFDSQWXCVBN";
  let activationCode = "";
  for (let i = 0; i < 25; i++) {
    activationCode += charactere[Math.floor(Math.random() * charactere.length)];
  }

  try {
    const data = req.body;

    if (await medecin.findOne({ cin_medecin: data.cin_medecin })) {
      return res.status(400).send({message: "CIN déjà existant"});
    }

    else if (await medecin.findOne({ numero_licence: data.numero_licence })) {
      return res.status(400).send({message:"Numéro de licence déjà existant"});
    }

    else if (await medecin.findOne({ telephone_personnel: data.telephone_personnel })) {
      return res.status(400).send({message:"Numéro de téléphone personnel déjà existant"});
    }

    else if (await medecin.findOne({ telephone_cabinet: data.telephone_cabinet })) {
      return res.status(400).send({message:"Numéro de téléphone du cabinet déjà existant"});
    }
    if (req.file /*req.file.size < 7000000*/ ) {
      data.photo_profil = req.file.path; 
    }
    console.log(req.file)
    let newMedecin = new medecin(data);
    newMedecin.activationCode = activationCode;

    const salt = bcrypt.genSaltSync(10);
    newMedecin.password = bcrypt.hashSync(data.password, salt);
    await newMedecin.save();

    // Envoi de l'email de vérification
    await sendVerificationEmail(newMedecin.email, newMedecin.cin_medecin, activationCode);

    res.status(200).send({ message: "Inscription réussie. Vérifiez votre email pour activer votre compte.", medecin: newMedecin });

  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

const verifMedecin = async (req, res) => {
  try {
    let actifcode = req.params.activationcode;
    actifcode = actifcode.substring(1);

    const recherche = await medecin.findOne({ activationCode: actifcode });

    if (!recherche) {
      res.status(400).send("Ce code d'activation est faux");
    } else {
      recherche.isActive = true;
      await recherche.save();
      res.status(200).send("Le compte est activé avec succès");
    }
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

const getAllMedecins = async (req, res) => {
  try {
    const allMedecins = await medecin.find({});
    res.status(200).send(allMedecins);
  } catch (err) {
    res.status(400).send(err);
  }
};

const deleteAllMedecins = async (req, res) => {
  try {
    const result = await medecin.deleteMany({});
    res.status(200).json({ message: "Tous les médecins ont été supprimés.", deletedCount: result.deletedCount });
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la suppression.", error });
  }
};


module.exports = {
  register,
  verifMedecin,
  getAllMedecins,
  deleteAllMedecins,
  
};
