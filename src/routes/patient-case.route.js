import  express from 'express';
import { isLoginCheck } from '../middleware/auth.middleware.js';
import { PatientCaseController } from '../controllers/patient-case.controller.js';
let patientCaseRouter = express.Router();

let patientCaseController = new PatientCaseController();

patientCaseRouter
  .route('/')
  .get(patientCaseController.list)
  .post(patientCaseController.save);

patientCaseRouter
  .route('/id/:id')
  .get(patientCaseController.getById)
  .put(patientCaseController.update)
  .delete(patientCaseController.delete);

export default patientCaseRouter;
