import { responseStatus } from '../helper/response.js';
import { msg } from '../helper/message.js';
import { PatientCaseService } from '../services/index.js';

export class PatientCaseController {
  patientCaseService = new PatientCaseService();

  save = async (req, res) => {
    try {
      return await this.patientCaseService.save(req, res);
    } catch (error) {
      console.log(error);
      return responseStatus(res, 500, msg.common.somethingWentWrong, error);
    }
  };

  list = async (req, res) => {
    try {
      return await this.patientCaseService.list(req, res);
    } catch (error) {
      return responseStatus(res, 500, msg.common.somethingWentWrong, error);
    }
  };

  update = async (req, res) => {
    try {
      return await this.patientCaseService.update(req, res);
    } catch (error) {
      console.log(error);
      return responseStatus(res, 500, msg.common.somethingWentWrong, error);
    }
  };

  delete = async (req, res) => {
    try {
      return await this.patientCaseService.deleteById(req, res);
    } catch (error) {
      console.log(error);
      return responseStatus(res, 500, msg.common.somethingWentWrong, error);
    }
  };

  getById = async (req, res) => {
    try {
      return await this.patientCaseService.getById(req, res);
    } catch (error) {
      console.log(error);
      return responseStatus(res, 500, msg.common.somethingWentWrong, error);
    }
  };
}
 