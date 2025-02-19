const express = require("express");
const router = express.Router();
const patientController = require("../controllers/authpatientcontroller");

// Routes pour Patient
router.post("/register", patientController.register);
router.post("/verifpatient/:activationcode", patientController.verifPatient);

// Export du routeur
module.exports = router;
