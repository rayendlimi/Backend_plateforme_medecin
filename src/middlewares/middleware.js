const jwt = require('jsonwebtoken');
const Medecin = require('../models/medecin'); // Assurez-vous d'importer vos modèles
const Secretaire = require('../models/secretaire');
const Patient = require('../models/patients');
const admin = require('../models/admin');


const authMiddleware = async (req, res, next) => {
    try {
        const token = req.header("Authorization");
        if (!token) return res.status(401).json({ message: "Accès refusé, token manquant" });
        const tokenValue = token.split(" ")[1];
        if (!tokenValue) return res.status(401).json({ message: "Token invalide" });

        // Vérifier et décoder le token d'accès
        let decoded;
        try {

            decoded = jwt.verify(tokenValue, '123456789');
        } catch (error) {
            if (error.name === "TokenExpiredError") {
                const refreshToken = req.header("x-refresh-token");
                if (!refreshToken) return res.status(401).json({ message: "Refresh token manquant" });

                
                const newAccessToken = await refreshAccessToken(refreshToken);
                if (!newAccessToken) return res.status(401).json({ message: "Refresh token invalide ou expiré" });

                // Attacher le nouvel access token à la réponse
                res.setHeader('x-new-access-token', newAccessToken);

                decoded = jwt.verify(newAccessToken, '123456789');
            } else {
                return res.status(401).json({ message: "Token invalide" });
            }
        }

        // Attacher les informations utilisateur à `req`
        req.user = decoded;

        console.log("Utilisateur authentifié:", req.user); // Debugging

        next();
    } catch (error) {
        console.error("Erreur d'authentification:", error);
        res.status(401).json({ message: "Erreur d'authentification" });
    }
};

// Fonction pour rafraîchir le token d'accès
const refreshAccessToken = async (refreshToken) => {
    try {
        // Vérifier et décoder le refresh token
        const decoded = jwt.verify(refreshToken, '123456789');

        // Trouver l'utilisateur dans la base de données
        const user = await Medecin.findOne({ _id: decoded.userId }) ||
                     await Secretaire.findOne({ _id: decoded.userId }) ||
                     await Patient.findOne({ _id: decoded.userId }) ||
                     await admin.findOne({ _id: decoded.userId });

        // Vérifier si l'utilisateur existe et si le refresh token correspond
        if (!user || user.refreshToken !== refreshToken) {
            return null;
        }

        // Générer un nouvel access token
        const newAccessToken = jwt.sign(
            { userId: user._id, role: user.role },
            '123456789',
            { expiresIn: "120m" } // Durée de validité du nouvel access token
        );

        return newAccessToken;
    } catch (error) {
        console.error("Erreur lors du rafraîchissement du token:", error);
        return null;
    }
};

module.exports = authMiddleware;