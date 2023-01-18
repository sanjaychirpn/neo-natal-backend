import { responseStatus } from '../helper/response.js';
import { msg } from '../helper/message.js';
import { UserRoleOnCaseRepository } from '../repository/index.js';
import { isValidObjectId } from 'mongoose';

export class UserRoleOnCaseService {
  userRoleOnCaseRepository = new UserRoleOnCaseRepository();

  save = async (req, res) => {
    try {
      let body = req.body;
      let checkForUserRoleExistence;
      let patientCaseId;
      let userRoleId;
      checkForUserRoleExistence =
        await this.userRoleOnCaseRepository.findByUserId(body.userId);

      patientCaseId = await this.userRoleOnCaseRepository.findByPatientCaseId(
        body.patientCaseId
      );

      userRoleId = await this.userRoleOnCaseRepository.findByUserRoleId(
        body.userRoleId
      );
      if (
        checkForUserRoleExistence !== null ||
        undefined ||
        patientCaseId !== null ||
        undefined ||
        userRoleId !== null ||
        undefined
      ) {
        return responseStatus(res, 400, `already exist`, null);
      }
      this.userRoleOnCaseRepository
        .save(body)
        .then(async (data) => {
          if (data) {
            return responseStatus(
              res,
              200,
              msg.userrole.userroleSavedSuccess,
              data
            );
          }
          return responseStatus(
            res,
            400,
            msg.userrole.userroleSavedError,
            null
          );
        })
        .catch((error) => {
          return responseStatus(res, 400, error.message, error);
        });
    } catch (error) {
      console.log(error);
      return responseStatus(res, 500, msg.common.somethingWentWrong, error);
    }
  };
  list = async (req, res) => {
    console.log('this is user role service');

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
        ];
      }
      const result = {};
      const length = await this.userRoleOnCaseRepository.countDocuments(filter);
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

      result.results = await this.userRoleOnCaseRepository.list(
        filter,
        sort,
        limit,
        startIndex
      );
      return responseStatus(res, 200, msg.common.recordFound, result);
    } catch (error) {
      console.log(error);
      return responseStatus(res, 500, msg.common.somethingWentWrong, error);
    }
  };

  update = async (req, res) => {
    try {
      const id = req.params.id;
      const files = req.files;
      const body = req.body;
      if (!(id && isValidObjectId(id))) {
        return responseStatus(res, 400, msg.common.wrongObjectId, null);
      }

      if (files?.videoUrl) {
        body.videoUrl = await uploadFile(files.videoUrl);
      }

      if (Object.keys(body).length === 0) {
        return responseStatus(res, 400, msg.common.emptyReqBody, null);
      }

      this.userRoleOnCaseRepository
        .update(id, body)
        .then((data) => {
          if (data) {
            return responseStatus(res, 200, msg.common.updatedSuccess, data);
          }
          return responseStatus(res, 404, msg.common.recordNotFound, null);
        })
        .catch((error) => {
          return responseStatus(res, 400, error.message, error);
        });
    } catch (error) {
      console.log(error);
      return responseStatus(res, 500, msg.common.somethingWentWrong, error);
    }
  };

  getById = async (req, res) => {
    try {
      const id = req.params.id;
      if (!(id && isValidObjectId(id))) {
        return responseStatus(res, 400, msg.common.wrongObjectId, null);
      }

      this.userRoleOnCaseRepository
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

  deleteById = async (req, res) => {
    try {
      const id = req.params.id;

      if (!(id && isValidObjectId(id))) {
        return responseStatus(res, 400, msg.common.wrongObjectId, null);
      }

      this.userRoleOnCaseRepository
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
}
