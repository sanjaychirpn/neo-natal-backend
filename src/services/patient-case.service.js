import { responseStatus } from '../helper/response.js';
import { msg } from '../helper/message.js';
import { isValidObjectId } from 'mongoose';
import { uploadFile } from '../helper/uploadFilesToCloudinary.js';
import {
  PatientCaseRepository,
  PatientRepository,
} from '../repository/index.js';

export class PatientCaseService {
  patientCaseRepository = new PatientCaseRepository();
  patientRepository = new PatientRepository();

  save = async (req, res) => {
    try {
      let body = req.body;
      let files = req.files;
      delete body.audioFileUrl;
      if (files?.audioFileUrl) {
        body.audioFileUrl = await uploadFile(files.audioFileUrl);
      }
      let checkForPatientExistence;
      checkForPatientExistence = await this.patientRepository.findById(
        body.patientId
      );
      if (checkForPatientExistence === null) {
        return responseStatus(res, 400, `Entered patientId not exist`, null);
      }
      this.patientCaseRepository
        .save(body)
        .then(async (data) => {
          if (data) {
            return responseStatus(
              res,
              200,
              msg.patientCase.patientCaseSavedSuccess,
              data
            );
          }
          return responseStatus(
            res,
            400,
            msg.patientCase.patientCaseSaveError,
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
    try {
      let query = req.query;
      let page = +query?.page || 1;
      let limit = +query?.limit || 10;
      let patientId = query?.patientId;
      const startIndex = (page - 1) * limit;
      const endIndex = page * limit;
      let sortBy = query?.sortBy;
      let searchKeyword = query?.search;
      let sort = {};
      let filter = {};
      if (sortBy?.includes('time-asc') || sortBy?.includes('time-desc')) {
        sort.createdAt = sortBy?.includes('time-asc') ? 1 : -1;
      }
      if (patientId) {
        filter.patientId = patientId;
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
      const length = await this.patientCaseRepository.countDocuments(filter);
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
      result.results = await this.patientCaseRepository.list(
        filter,
        sort,
        limit,
        startIndex
      );
      return responseStatus(res, 200, msg.common.recordFound, result);
    } catch (error) {
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

      if (files?.audioFileUrl) {
        body.audioFileUrl = await uploadFile(files.audioFileUrl);
      }

      if (Object.keys(body).length === 0) {
        return responseStatus(res, 400, msg.common.emptyReqBody, null);
      }

      this.patientCaseRepository
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

      this.patientCaseRepository
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

      this.patientCaseRepository
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
