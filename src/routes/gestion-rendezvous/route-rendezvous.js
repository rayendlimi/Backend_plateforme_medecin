const express = require('express');
const router = express.Router();
const rendezvousController = require('../../controllers/gestion-rendezvous/controller-rendezvous');
const authMiddleware=require('../../middlewares/middleware')

// Routes for managing appointments
router.post('/',authMiddleware, rendezvousController.createRendezvous);
router.get('/',authMiddleware, rendezvousController.getAllRendezvous);
router.get('/:id',authMiddleware, rendezvousController.getRendezvousById);
router.get('/specialite/:specialite',authMiddleware, rendezvousController.getrendezvousbyspecialite);
router.get('/date/:date',authMiddleware, rendezvousController.getrendezvousbydate);
router.put('/:id',authMiddleware, rendezvousController.updateRendezvous);
router.post('/verif/:id',authMiddleware, rendezvousController.confirmerrendezvous);
router.delete('/:id',authMiddleware, rendezvousController.deleteRendezvous);

module.exports = router;
