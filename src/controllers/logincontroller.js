const jwt = require("jsonwebtoken");
const Medecin = require("../models/medecin");
const Secretaire = require("../models/secretaire");
const Patient = require("../models/patients");
const bcrypt = require("bcrypt");
const admin = require("../models/admin");

const generateTokens = (user, role) => {
  const accessToken = jwt.sign(
    { userId: user._id, role },
    "123456789",
    { expiresIn: "99m" } // Short-lived access token
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

  let user;
  let role;

  // Vérification dans Medecin
  user = await Medecin.findOne({ cin_medecin: data.cin_medecin });
  if (user) {
    role = "medecin";
  } else {
    // Vérification dans Secretaire
    user = await Secretaire.findOne({ cin_secretaire: data.cin_secretaire });
    if (user) {
      role = "secretaire";
    } else {
      // Vérification dans Patient
      user = await Patient.findOne({ cin_patient: data.cin_patient });
      if (user) {
        role = "patient";
      }
      // Vérification dans Admin
      user = await admin.findOne({ username: data.username });
      if (user) {
        role = "admin"; // Correction du rôle
      } else {
        return res.status(401).send({ message: "utilisateur non trouvé" });
      }
    }
  }

  // Vérification du mot de passe
  if (!bcrypt.compareSync(data.password, user.password)) {
    return res.status(401).json({ message: "password incorrect" });
  }

  // Génération des tokens
  const { accessToken, refreshToken } = generateTokens(user, role);

  // Sauvegarde du refresh token
  user.refreshToken = refreshToken;
  await user.save();

  // Réponse avec tokens et rôle
  res.json({ accessToken, refreshToken, role });
};

module.exports = login;
