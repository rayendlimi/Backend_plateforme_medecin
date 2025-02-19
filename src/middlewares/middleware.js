const jwt = require('jsonwebtoken');

const authMiddleware = async (req, res, next) => {
    try {
        const token = req.header("Authorization");
        if (!token) return res.status(401).send("Accès refusé, token manquant");

        const tokenValue = token.split(" ")[1];
        if (!tokenValue) return res.status(401).send("Token invalide");

        // Vérifier et décoder le token JWT
        const decoded = jwt.verify(tokenValue, '123456789');

        

        // Attacher les informations utilisateur à `req`
        req.user = decoded

        console.log("Utilisateur authentifié:" , req.user); // Debugging

        next(); // Passer au middleware suivant
    } catch (error) {
        if (error.name === "TokenExpiredError") {
            return res.status(401).send("Access token expired");
        }
        res.status(401).send("Token invalide");
    }
};

module.exports = authMiddleware;
