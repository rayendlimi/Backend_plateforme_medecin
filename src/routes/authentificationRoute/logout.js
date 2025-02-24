const express = require('express');
const router = express.Router();
const { logout } = require('../../controllers/authentificationController/logoutcontroller');
const authMiddleware = require('../../middlewares/middleware');


router.post('/logout', authMiddleware, logout);

module.exports = router;
