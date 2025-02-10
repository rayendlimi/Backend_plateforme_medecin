const jwt = require("jsonwebtoken");
const Patient = require("../models/patients"); // Assurez-vous d'avoir un modèle Patient

const authPatient = async (req, res, next) => {
  try {
    // Récupérer le token depuis l'en-tête Authorization
    const token = req.header("Authorization");
    if (!token) return res.status(401).send("Accès refusé, token manquant");

    // Extraire le token (format: "Bearer <token>")
    const tokenValue = token.split(" ")[1];
    if (!tokenValue) return res.status(401).send("Token invalide");

    // Vérifier et décoder le token JWT
    const decoded = jwt.verify(tokenValue, "123456789"); // Utilisez la même clé secrète que pour les médecins et secrétaires
    
    // Rechercher le patient en base de données
    const patient = await Patient.findOne({ id_patient: decoded.id_patient });
    if (!patient) return res.status(401).send("Patient non trouvé");

    // Ajouter le patient à la requête pour les prochaines routes
    req.patient = patient;
    next();
  } catch (error) {
    res.status(401).send("Token invalide");
  }
};

module.exports = authPatient;