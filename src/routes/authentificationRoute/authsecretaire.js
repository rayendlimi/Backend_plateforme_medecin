const express = require("express");
const router = express.Router();
const secretaireController = require("../../controllers/authentificationController/authsecretairecontroller");
const authMiddleware = require("../../middlewares/middleware");

// Routes pour Secretaire
router.post("/register", authMiddleware, secretaireController.register);

// Export du routeur
module.exports = router;
