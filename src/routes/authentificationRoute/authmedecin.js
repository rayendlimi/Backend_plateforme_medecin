const express = require("express");
const router = express.Router();
const medecinController = require("../../controllers/authentificationController/authmedecincontroller");
const multer = require("multer");
const authMiddleware=require('../../middlewares/middleware')
const storage = multer.diskStorage({
  destination: "./uploads",
  filename: (req, file, redirect) => {
    let date = Date.now();
    let fl = date + "." + file.mimetype.split("/")[1];
    redirect(null, fl);
    console.log(fl);
  },
});

const upload = multer({ storage });


router.post("/register", upload.single("photo_profil"), medecinController.register);
router.post("/verifmedecin/:activationcode", medecinController.verifMedecin);
router.get("/all", medecinController.getAllMedecins);

module.exports = router;
