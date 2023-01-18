import { responseStatus } from '../helper/response.js';
import { msg } from '../helper/message.js';
import { isValidObjectId } from 'mongoose';
import { uploadFile } from '../helper/uploadFilesToCloudinary.js';
import { PatientRepository } from '../repository/index.js';

export class PatientService {
  patientRepository = new PatientRepository();

  save = async (req, res) => {
    try {
      let patient = req.body;
      patient.vitalsImages = [];
      patient.xRayImages = [];
      let files = req.files;

      if (files?.xRayImages) {
        if (!files.xRayImages?.length) {
          files.xRayImages = [files.xRayImages];
        }

        for (const element of files.xRayImages) {
          let result = await uploadFile(element);
          patient.xRayImages.push(result);
        }
      }

      if (files?.vitalsImages) {
        if (!files.vitalsImages?.length) {
          files.vitalsImages = [files.vitalsImages];
        }
        for (const element of files.vitalsImages) {
          let result = await uploadFile(element);
          patient.vitalsImages.push(result);
        }
      }

      this.patientRepository
        .save(patient)
        .then(async (data) => {
          if (data) {
            return responseStatus(
              res,
              200,
              msg.patient.patientSavedSuccess,
              data
            );
          }
          return responseStatus(res, 400, msg.patient.patientSaveError, null);
        })
        .catch((error) => {
          return responseStatus(res, 400, error.message, error);
        });
    } catch (error) {
      console.log(error);
      return responseStatus(res, 500, msg.common.somethingWentWrong, error);
    }
  };

  listPatients = async (req, res) => {
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
      const length = await this.patientRepository.countDocuments(filter);
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

      result.results = await this.patientRepository.list(
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
      req.body.vitalsImages = [];
      req.body.xRayImages = [];
      const files = req.files;
      if (!(id && isValidObjectId(id))) {
        return responseStatus(res, 400, msg.common.wrongObjectId, null);
      }

      if (files?.xRayImages) {
        if (!files.xRayImages?.length) {
          files.xRayImages = [files.xRayImages];
        }

        for (const element of files.xRayImages) {
          let result = await uploadFile(element);
          req.body.xRayImages.push(result);
        }
      }

      if (files?.vitalsImages) {
        if (!files.vitalsImages?.length) {
          files.vitalsImages = [files.vitalsImages];
        }
        for (const element of files.vitalsImages) {
          let result = await uploadFile(element);
          req.body.vitalsImages.push(result);
        }
      }

      if (Object.keys(req.body).length === 0) {
        return responseStatus(res, 400, msg.common.emptyReqBody, null);
      }

      this.patientRepository
        .update(id, req.body)
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

  getPatientById = async (req, res) => {
    try {
      const id = req.params.id;

      if (!(id && isValidObjectId(id))) {
        return responseStatus(res, 400, msg.common.wrongObjectId, null);
      }

      this.patientRepository
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

  deletePatientById = async (req, res) => {
    try {
      const id = req.params.id;

      if (!(id && isValidObjectId(id))) {
        return responseStatus(res, 400, msg.common.wrongObjectId, null);
      }

      this.patientRepository
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

  deleteImages = async (req, res) => {
    try {
      const vitalsImageUrl = req.query?.vitalsImageUrl;
      const xRayImageUrl = req.query?.xRayImageUrl;
      const patientId = req.params?.id;
      if (!(patientId && isValidObjectId(patientId))) {
        return responseStatus(res, 400, 'enter correct patientId', null);
      }
      if (!(vitalsImageUrl || xRayImageUrl)) {
        return responseStatus(
          res,
          400,
          'enter correct vitalsImageUrl/ xRayImageUrl',
          null
        );
      }

      this.patientRepository
        .deleteImages({ vitalsImageUrl, xRayImageUrl, patientId })
        .then((data) => {
          if (data) {
            return responseStatus(res, 200, msg.image.deletedSuccess, data);
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
