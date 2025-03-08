const express =require('express');
const router = express.Router();
const authMiddleware=require('../../middlewares/middleware')
const controllerconsultation=require('../../controllers/gestion-consultations/controller-consultation')


router.post('/', authMiddleware, controllerconsultation.createconsultation);
router.get('/', authMiddleware, controllerconsultation.getAllConsultations)
router.get('/:cin_patient', authMiddleware, controllerconsultation.getconsultationsbypatient)
router.put('/:id', authMiddleware,controllerconsultation.updateconsultation)
module.exports = router;

