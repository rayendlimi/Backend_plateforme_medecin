const express = require("express");
const router = express.Router();
const authMiddleware = require("../../middlewares/middleware");
const updateProfile = require("../../controllers/authentificationController/updateprofilcontroller");

router.put("/updateprofile", authMiddleware, updateProfile);


module.exports = router;
