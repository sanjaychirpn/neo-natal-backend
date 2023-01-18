import { responseStatus } from '../helper/response.js';
import { msg } from '../helper/message.js';
import { PatientService } from '../services/index.js';

export class PatientController {
  patientService = new PatientService();

  save = async (req, res) => {
    try {
      return await this.patientService.save(req, res);
    } catch (error) {
      console.log(error);
      return responseStatus(res, 500, msg.common.somethingWentWrong, error);
    }
  };

  list = async (req, res) => {
    try {
      return await this.patientService.listPatients(req, res);
    } catch (error) {
      return responseStatus(res, 500, msg.common.somethingWentWrong, error);
    }
  };

  update = async (req, res) => {
    try {
      return await this.patientService.update(req, res);
    } catch (error) {
      console.log(error);
      return responseStatus(res, 500, msg.common.somethingWentWrong, error);
    }
  };

  delete = async (req, res) => {
    try {
      return await this.patientService.deletePatientById(req, res);
    } catch (error) {
      console.log(error);
      return responseStatus(res, 500, msg.common.somethingWentWrong, error);
    }
  };

  getById = async (req, res) => {
    try {
      return await this.patientService.getPatientById(req, res);
    } catch (error) {
      console.log(error);
      return responseStatus(res, 500, msg.common.somethingWentWrong, error);
    }
  };

  deleteImages = async (req, res) => {
    try {
      return await this.patientService.deleteImages(req, res);
    } catch (error) {
      console.log(error);
      return responseStatus(res, 500, msg.common.somethingWentWrong, error);
    }
  };
}
 