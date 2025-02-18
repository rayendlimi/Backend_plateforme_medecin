const jwt = require("jsonwebtoken");
const Medecin = require("../../models/medecin");

const authMedecin = async (req, res, next) => {
  try {
    const token = req.header("Authorization");
    if (!token) return res.status(401).send( "Accès refusé, token manquant" );

    const tokenValue = token.split(" ")[1]; // Extraction du token
    if (!tokenValue) return res.status(401).send("Token invalide");

    // Vérifier et décoder le token JWT
    const decoded = jwt.verify(tokenValue, "123456789"); // Remplacez par une clé secrète plus sécurisée

    // Rechercher le Médecin en base de données
    const medecin = await Medecin.findOne({ cin_medecin: decoded.cin_medecin });
    if (!medecin) return res.status(401).send( "Médecin non trouvé");

    req.medecin = medecin; // Ajouter le Médecin à la requête pour les prochaines routes
    next();
  } catch (error) {
    res.status(401).send("Token invalide");
    
  }
};

module.exports = authMedecin;
