const jwt = require("jsonwebtoken");
const Secretaire = require("../models/secretaire"); // Assurez-vous d'avoir un modèle Secretaire

const authSecretaire = async (req, res, next) => {
  try {
    // Récupérer le token depuis l'en-tête Authorization
    const token = req.header("Authorization");
    if (!token) return res.status(401).send("Accès refusé, token manquant");

    // Extraire le token (format: "Bearer <token>")
    const tokenValue = token.split(" ")[1];
    if (!tokenValue) return res.status(401).send("Token invalide");

    // Vérifier et décoder le token JWT
    const decoded = jwt.verify(tokenValue, "123456789"); // Utilisez la même clé secrète que pour les médecins

    // Rechercher la secrétaire en base de données
    const secretaire = await Secretaire.findOne({ id_secretaire: decoded.id_secretaire });
    if (!secretaire) return res.status(401).send("Secrétaire non trouvée");

    // Ajouter la secrétaire à la requête pour les prochaines routes
    req.secretaire = secretaire;
    next();
  } catch (error) {
    res.status(401).send("Token invalide");
  }
};

module.exports = authSecretaire;