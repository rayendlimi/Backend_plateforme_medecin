const express = require("express");
const router = express.Router();
const login = require("../controllers/logincontroller");

// Route pour la connexion des utilisateurs (Médecin, Secrétaire, Patient, Admin)
router.post("/login", login);

module.exports = router;
