const patients = require("../models/patients");
const bcrypt = require("bcrypt");
const sendVerificationEmail = require("../nodemailer/verifemail");

const register = async (req, res) => {
  const charactere = "azertyuiopmlkjhgfdsqwxcvbnAZERTYUIOPMLKJHGFDSQWXCVBN";
  let activationCode = "";
  for (let i = 0; i < 25; i++) {
    activationCode += charactere[Math.floor(Math.random() * charactere.length)];
  }

  try {
    const data = req.body;

    if (await patients.findOne({ cin_patient: data.cin_patient })) {
      return res.status(400).send("CIN déjà existant");
    }

    if (await patients.findOne({ telephone: data.telephone })) {
      return res.status(401).send("Numéro de téléphone déjà existant");
    }

    let newPatient = new patients(data);
    newPatient.activationCode = activationCode;

    const salt = bcrypt.genSaltSync(10);
    newPatient.password = bcrypt.hashSync(data.password, salt);

    await newPatient.save();

    // Envoi de l'email de vérification
    await sendVerificationEmail(newPatient.email, "authpatient", newPatient.activationCode);

    res.status(200).send({ message: "Inscription réussie. Vérifiez votre email pour activer votre compte.", patient: newPatient });

  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

const verifPatient = async (req, res) => {
  try {
    let actifcode = req.params.activationcode;
    const recherche = await patients.findOne({ activationCode: actifcode });

    console.log(actifcode);

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

// Export des contrôleurs
module.exports = {
  register,
  verifPatient,
};
