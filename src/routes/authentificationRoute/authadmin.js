const express = require('express');
const router = express.Router();
const registerAdmin= require('../../controllers/authentificationController/authadmincontroller');

// Route pour l'enregistrement de l'admin
router.post('/registeradmin', registerAdmin);


module.exports = router;
