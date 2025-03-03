const express = require('express');
const router = express.Router();
const rendezvousController = require('../../controllers/gestion-rendezvous/controller-rendezvous');
const authMiddleware=require('../../middlewares/middleware')

// Routes for managing appointments
router.post('/',authMiddleware, rendezvousController.createRendezvous);
router.get('/', rendezvousController.getAllRendezvous);
router.get('/:id', rendezvousController.getRendezvousById);
router.get('/specialite/:specialite', rendezvousController.getrendezvousbyspecialite);
router.get('/date/:date', rendezvousController.getrendezvousbydate);

router.put('/:id', rendezvousController.updateRendezvous);
router.delete('/:id', rendezvousController.deleteRendezvous);

module.exports = router;
