import { responseStatus } from '../helper/response.js';
import { msg } from '../helper/message.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
const JWT_SECRET = process.env.JWT_SECRET;
import { uploadFile } from '../helper/uploadFilesToCloudinary.js';
import { isValidObjectId } from 'mongoose';
import { UserRepository } from '../repository/index.js';

export class UserService {
  userRepository = new UserRepository();

  save = async (req, res) => {
    try {
      const user = req.body;
      const find = await this.userRepository.findByEmail(user.email);
      if (find) {
        return responseStatus(res, 400, msg.user.userEmailExist, null);
      }
      if (req.files?.avatarUrl) {
        console.log(req.files.avatarUrl);
        user.avatarUrl = await uploadFile(req.files.avatarUrl);
      }
      this.userRepository
        .save(user)
        .then(async (data) => {
          if (data) {
            return responseStatus(res, 200, msg.user.userSavedSuccess, data);
          }
          return responseStatus(res, 400, msg.user.userSaveError, null);
        })
        .catch((error) => {
          return responseStatus(res, 400, error.message, error);
        });
    } catch (error) {
      console.log(error);
      return responseStatus(res, 500, msg.common.somethingWentWrong, error);
    }
  };

  login = async (req, res) => {
    try {
      const credentials = req.body;
      this.userRepository
        .findByEmail(credentials.email)
        .then(async (data) => {
          if (!data) {
            return responseStatus(res, 404, msg.user.emailNotFound, null);
          }
          const validPassword = await bcrypt.compare(
            credentials.password,
            data.password
          );
          if (validPassword) {
            const token = jwt.sign({ _id: data._id }, JWT_SECRET);

            const options = {
              expiresAt: '3d',
              httpOnly: true,
            };
            res.cookie('token', token, options);
            return responseStatus(res, 200, msg.user.loggedInSuccess, {
              token,
            });
          } else {
            return responseStatus(res, 401, msg.user.passwordNotValid, null);
          }
        })
        .catch((err) => {
          return responseStatus(res, 400, err.message, err);
        });
    } catch (error) {
      console.log(error);
      return responseStatus(res, 500, msg.common.somethingWentWrong, error);
    }
  };

  listUsers = async (req, res) => {
    try {
      let page;
      let limit;
      let query = req.query;
      let filter = {};
      page = +query?.page || 1;
      limit = +query?.limit || 10;
      const startIndex = (page - 1) * limit;
      const endIndex = page * limit;
      let sortBy = query?.sortBy;
      let searchKeyword = query?.search;
      let sort = {};

      if (sortBy?.includes('time-asc') || sortBy?.includes('time-desc')) {
        sort.createdAt = sortBy?.includes('time-asc') ? 1 : -1;
      }

      if (searchKeyword) {
        filter['$or'] = [
          {
            name: {
              $regex: searchKeyword,
              $options: 'i',
            },
          },
          {
            email: {
              $regex: searchKeyword,
              $options: 'i',
            },
          },
        ];
      }
      const result = {};
      const length = await this.userRepository.countDocuments(filter);
      result.total_count = length;
      result.total_pages = Math.ceil(length / limit);
      if (result.total_pages < page) {
        result.msg = 'Page Number exceeds limit!';
        result.results = [];
        return res.json(result);
      }
      if (endIndex < length) {
        result.next = {
          page: page + 1,
          limit: limit,
        };
      }
      if (startIndex > 0) {
        result.previous = {
          page: page - 1,
          limit: limit,
        };
      }

      result.results = await this.userRepository.list(
        filter,
        sort,
        limit,
        startIndex
      );
      return responseStatus(res, 200, msg.common.recordFound, result);
    } catch (error) {
      console.log({ error });
      return responseStatus(res, 500, msg.common.somethingWentWrong, error);
    }
  };

  update = async (req, res) => {
    try {
      const id = req.params.id;
      if (!(id && isValidObjectId(id))) {
        return responseStatus(res, 400, msg.common.wrongObjectId, null);
      }
      if (req.files?.avatarUrl) {
        console.log(req.files.avatarUrl);
        req.body.avatarUrl = await uploadFile(req.files.avatarUrl);
      }
      console.log(req.body);
      if (Object.keys(req.body).length === 0) {
        return responseStatus(res, 400, msg.common.emptyReqBody, null);
      }
      if (req.body?.password) {
        let hashedPassword = await bcrypt.hash(req.body?.password, 10);
        req.body.password = hashedPassword;
      }
      this.userRepository
        .update(id, req.body)
        .then((data) => {
          if (data) {
            return responseStatus(res, 200, `User Update Successfully!`, data);
          }
          return responseStatus(res, 404, `User doesn't found!`, null);
        })
        .catch((error) => {
          return responseStatus(res, 400, error.message, error);
        });
    } catch (error) {
      console.log(error);
      return responseStatus(res, 500, msg.common.somethingWentWrong, error);
    }
  };

  getUserById = async (req, res) => {
    try {
      const id = req.params.id;

      if (!(id && isValidObjectId(id))) {
        return responseStatus(res, 400, `Enter correct id in params`, null);
      }

      this.userRepository
        .findById(id)
        .then((data) => {
          if (data) {
            return responseStatus(res, 200, msg.common.recordFound, data);
          }
          return responseStatus(res, 200, msg.common.recordNotFound, null);
        })
        .catch((error) => {
          return responseStatus(res, 400, error.message, error);
        });
    } catch (error) {
      console.log(error);
      return responseStatus(res, 500, msg.common.somethingWentWrong, error);
    }
  };

  deleteUserById = async (req, res) => {
    try {
      const id = req.params.id;

      if (!(id && isValidObjectId(id))) {
        return responseStatus(res, 400, `Enter correct id in params`, null);
      }

      this.userRepository
        .findByIdAndDelete(id)
        .then((data) => {
          if (data) {
            return responseStatus(res, 200, msg.common.deletedSuccess, data);
          }
          return responseStatus(res, 200, msg.common.recordNotFound, null);
        })
        .catch((error) => {
          return responseStatus(res, 400, error.message, error);
        });
    } catch (error) {
      console.log(error);
      return responseStatus(res, 500, msg.common.somethingWentWrong, error);
    }
  };

  getLoggedInUser = async (req, res) => {
    try {
      if (!req.user?._id) {
        return responseStatus(res, 400, `id not found in req.user`, null);
      }
      const id = req.user._id;

      if (!(id && isValidObjectId(id))) {
        return responseStatus(res, 400, `Incorrect id in token`, null);
      }

      this.userRepository
        .findById(id)
        .then((data) => {
          if (data) {
            return responseStatus(res, 200, msg.common.recordFound, data);
          }
          return responseStatus(res, 200, msg.common.recordNotFound, null);
        })
        .catch((error) => {
          return responseStatus(res, 400, error.message, error);
        });
    } catch (error) {
      console.log(error);
      return responseStatus(res, 500, msg.common.somethingWentWrong, error);
    }
  };

  getUserByEmail = async (req, res) => {
    try {
      const email = req.query.email;
      if (!email) {
        return responseStatus(res, 400, 'Enter email in query', null);
      }
      this.userRepository
        .findByEmail(email)
        .then((data) => {
          if (data) {
            return responseStatus(res, 200, msg.common.recordFound, data);
          }
          return responseStatus(res, 200, msg.common.recordNotFound, null);
        })
        .catch((error) => {
          return responseStatus(res, 400, error.message, error);
        });
    } catch (error) {
      console.log(error);
      return responseStatus(res, 500, msg.common.somethingWentWrong, error);
    }
  };
}
