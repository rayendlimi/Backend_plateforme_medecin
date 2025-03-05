const express =require('express');
const router = express.Router();
const authMiddleware=require('../../middlewares/middleware')
const controllerconsultation=require('../../controllers/gestion-consultations/controller-consultation')


router.post('./',authMiddleware, controllerconsultation.createconsultation )
