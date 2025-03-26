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
    { expiresIn: "7d" } // Short-lived access token
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

  try {
    // Vérification dans Medecin
    utilisateur = await Medecin.findOne({ cin_medecin: data.cin });
    if (utilisateur) {
      console.log("Utilisateur trouvé dans Medecin:", utilisateur);
    } else {
      // Vérification dans Secretaire
      utilisateur = await Secretaire.findOne({ cin_secretaire: data.cin });
      if (utilisateur) {
        console.log("Utilisateur trouvé dans Secretaire:", utilisateur);
      } else {
        // Vérification dans Patient
        utilisateur = await Patient.findOne({ cin_patient: data.cin });
        if (utilisateur) {
          console.log("Utilisateur trouvé dans Patient:", utilisateur);
        } else {
          // Vérification dans Admin
          utilisateur = await admin.findOne({ username: data.cin });
          if (utilisateur) {
            console.log("Utilisateur trouvé dans Admin:", utilisateur);
          } else {
            console.log("Aucun utilisateur trouvé avec ce CIN/Username:", data.cin);
            return res.status(401).send({ message: "utilisateur non trouvé" });
          }
        }
      }
    }

    // Vérification du mot de passe
    if (!bcrypt.compareSync(data.password, utilisateur.password)) {
      console.log("Mot de passe incorrect pour l'utilisateur:", utilisateur);
      return res.status(401).json({ message: "password incorrect" });
    }

    // Vérification du statut isActive
    if (utilisateur.isActive !== true) {
      console.log("Compte non activé pour l'utilisateur:", utilisateur);
      return res.status(401).send({ message: "nous avons envoyé un email de verification a vous, merci de verifier votre compte" });
    }

    // Génération des tokens
    const { accessToken, refreshToken } = generateTokens(utilisateur, utilisateur.role);
    utilisateur.refreshToken = refreshToken;
    await utilisateur.save();

    // Réponse avec les tokens
    res.json({ accessToken, refreshToken });
  } catch (error) {
    console.error("Erreur lors de la connexion:", error);
    res.status(500).send({ message: "Une erreur est survenue lors de la connexion" });
  }
};

module.exports = login;