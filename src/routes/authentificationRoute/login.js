const express = require("express");
const router = express.Router();
const login = require("../../controllers/authentificationController/logincontroller");

//  connexion des utilisateurs (medecin, Secrétaire, Patient, Admin)
router.post("/login", login);

module.exports = router;
