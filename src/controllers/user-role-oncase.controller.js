import { responseStatus } from '../helper/response.js';
import { msg } from '../helper/message.js';
import { UserRoleOnCaseService } from '../services/index.js';

export class UserRoleOnCaseController {
  userRoleOnCaseService = new UserRoleOnCaseService();
  save = async (req, res) => {
    try {
      return await this.userRoleOnCaseService.save(req, res);
    } catch (error) {
      console.log(error);
      return responseStatus(res, 500, msg.common.somethingWentWrong, error);
    }
  };
  list = async (req, res) => {
    try {
      console.log('this is user role controller');
      return await this.userRoleOnCaseService.list(req, res);
    } catch (error) {
      return responseStatus(res, 500, msg.common.somethingWentWrong, error);
    }
  };
  update = async (req, res) => {
    try {
      return await this.userRoleOnCaseService.update(req, res);
    } catch (error) {
      console.log(error);
      return responseStatus(res, 500, msg.common.somethingWentWrong, error);
    }
  };

  delete = async (req, res) => {
    try {
      return await this.userRoleOnCaseService.deleteById(req, res);
    } catch (error) {
      console.log(error);
      return responseStatus(res, 500, msg.common.somethingWentWrong, error);
    }
  };

  getById = async (req, res) => {
    try {
      return await this.userRoleOnCaseService.getById(req, res);
    } catch (error) {
      console.log(error);
      return responseStatus(res, 500, msg.common.somethingWentWrong, error);
    }
  };
}
