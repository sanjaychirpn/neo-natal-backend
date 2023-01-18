import express from 'express';
import { PatientController } from '../controllers/patient.controller.js';
let patientRouter = express.Router();

let patientController = new PatientController();

patientRouter
  .route('/')
  .get(patientController.list)
  .post(patientController.save);

patientRouter
  .route('/id/:id')
  .get(patientController.getById)
  .put(patientController.update)
  .patch(patientController.deleteImages)
  .delete(patientController.delete);

export default patientRouter;
