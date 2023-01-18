import { responseStatus } from '../helper/response.js';
import { msg } from '../helper/message.js';
import { UserService } from '../services/index.js';

export class UserController {
  userService = new UserService();

  save = async (req, res) => {
    try {
      return await this.userService.save(req, res);
    } catch (error) {
      console.log(error);
      return responseStatus(res, 500, msg.common.somethingWentWrong, error);
    }
  };

  listUsers = async (req, res) => {
    try {
      return await this.userService.listUsers(req, res);
    } catch (error) {
      console.log({ error });
      return responseStatus(res, 500, msg.common.somethingWentWrong, error);
    }
  };

  update = async (req, res) => {
    try {
      return await this.userService.update(req, res);
    } catch (error) {
      console.log(error);
      return responseStatus(res, 500, msg.common.somethingWentWrong, error);
    }
  };

  delete = async (req, res) => {
    try {
      return await this.userService.deleteUserById(req, res);
    } catch (error) {
      console.log(error);
      return responseStatus(res, 500, msg.common.somethingWentWrong, error);
    }
  };

  getUserById = async (req, res) => {
    try {
      return await this.userService.getUserById(req, res);
    } catch (error) {
      console.log(error);
      return responseStatus(res, 500, msg.common.somethingWentWrong, error);
    }
  };

  getUserByEmail = async (req, res) => {
    try {
      return await this.userService.getUserByEmail(req, res);
    } catch (error) {
      console.log(error);
      return responseStatus(res, 500, msg.common.somethingWentWrong, error);
    }
  };

  login = async (req, res) => {
    try {
      return await this.userService.login(req, res);
    } catch (error) {
      console.log(error);
      return responseStatus(res, 500, msg.common.somethingWentWrong, error);
    }
  };

  getLoggedInUser = async (req, res) => {
    try {
      return await this.userService.getLoggedInUser(req, res);
    } catch (error) {
      console.log(error);
      return responseStatus(res, 500, msg.common.somethingWentWrong, error);
    }
  };

  resetPassword = async (req, res) => {
    try {
      return await this.userService.resetPassword(req, res);
    } catch (error) {
      console.log(error);
      return responseStatus(res, 500, msg.common.somethingWentWrong, error);
    }
  };

  verifyOtpAndUpdatePassword = async (req, res) => {
    try {
      return await this.userService.verifyOtpAndUpdatePassword(req, res);
    } catch (error) {
      console.log(error);
      return responseStatus(res, 500, msg.common.somethingWentWrong, error);
    }
  };
}
