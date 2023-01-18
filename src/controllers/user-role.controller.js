import { responseStatus } from '../helper/response.js';
import { msg } from '../helper/message.js';
import { UserRoleService } from '../services/index.js';

export class UserRoleController {
  userRoleService = new UserRoleService();
  save = async (req, res) => {
    try {
      return await this.userRoleService.save(req, res);
    } catch (error) {
      console.log(error);
      return responseStatus(res, 500, msg.common.somethingWentWrong, error);
    }
  };
  list = async (req, res) => {
    try {
      console.log('this is user role controller');
      return await this.userRoleService.list(req, res);
    } catch (error) {
      return responseStatus(res, 500, msg.common.somethingWentWrong, error);
    }
  };
  update = async (req, res) => {
    try {
      return await this.userRoleService.update(req, res);
    } catch (error) {
      console.log(error);
      return responseStatus(res, 500, msg.common.somethingWentWrong, error);
    }
  };

  delete = async (req, res) => {
    try {
      return await this.userRoleService.deleteById(req, res);
    } catch (error) {
      console.log(error);
      return responseStatus(res, 500, msg.common.somethingWentWrong, error);
    }
  };

  getById = async (req, res) => {
    try {
      return await this.userRoleService.getById(req, res);
    } catch (error) {
      console.log(error);
      return responseStatus(res, 500, msg.common.somethingWentWrong, error);
    }
  };
}
