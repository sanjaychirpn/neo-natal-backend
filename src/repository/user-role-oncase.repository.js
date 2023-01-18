import UserRoleOnCaseModel from '../models/user-role-oncase.model.js';

export class UserRoleOnCaseRepository {
  save = async (newEntry) => {
    return new Promise(async (resolve, reject) => {
      try {
        const data = new UserRoleOnCaseModel(newEntry);
        data
          .save()
          .then((data) => {
            resolve(data);
          })
          .catch((err) => {
            reject(err);
          });
      } catch (error) {
        reject(error);
        throw new Error(error);
      }
    });
  };

  findByUserId = async (userId) => {
    return new Promise(async (resolve, reject) => {
      try {
        UserRoleOnCaseModel.findOne({ userId })
          .then((data) => resolve(data))
          .catch((err) => reject(err));
      } catch (error) {
        reject(error);
        throw new Error(error);
      }
    });
  };

  findByPatientCaseId = async (patientCaseId) => {
    return new Promise(async (resolve, reject) => {
      try {
        UserRoleOnCaseModel.findOne({ patientCaseId })
          .then((data) => resolve(data))
          .catch((err) => reject(err));
      } catch (error) {
        reject(error);
        throw new Error(error);
      }
    });
  };

  findByUserRoleId = async (userRoleId) => {
    return new Promise(async (resolve, reject) => {
      try {
        UserRoleOnCaseModel.findOne({ userRoleId })
          .then((data) => resolve(data))
          .catch((err) => reject(err));
      } catch (error) {
        reject(error);
        throw new Error(error);
      }
    });
  };

  findById = async (id) => {
    return new Promise(async (resolve, reject) => {
      try {
        UserRoleOnCaseModel.findById(id)
          .then((data) => resolve(data))
          .catch((err) => reject(err));
      } catch (error) {
        reject(error);
        throw new Error(error);
      }
    });
  };

  list = async (filter, sort, limit, skip) => {
    return new Promise(async (resolve, reject) => {
      try {
        UserRoleOnCaseModel.find(filter)
          .populate('userId')
          .populate('patientCaseId')
          .populate('userRoleId')
          .sort(sort)
          .limit(limit)
          .skip(skip)
          .then((data) => {
            resolve(data);
          })
          .catch((err) => {
            reject(err);
          });
      } catch (error) {
        console.log(error);
        reject(error);
        throw new Error(error);
      }
    });
  };

  countDocuments = async (filter) => {
    return new Promise(async (resolve, reject) => {
      try {
        UserRoleOnCaseModel.countDocuments(filter)
          .exec()
          .then((data) => resolve(data))
          .catch((err) => reject(err));
      } catch (error) {
        reject(error);
        throw new Error(error);
      }
    });
  };

  findByIdAndDelete = async (id) => {
    return new Promise(async (resolve, reject) => {
      try {
        UserRoleOnCaseModel.findByIdAndDelete(id)
          .then((data) => resolve(data))
          .catch((err) => reject(err));
      } catch (error) {
        reject(error);
        throw new Error(error);
      }
    });
  };

  update = async (id, newData) => {
    return new Promise(async (resolve, reject) => {
      try {
        let query = {
          $set: newData,
        };

        UserRoleOnCaseModel.findByIdAndUpdate(id, query, { new: true })
          .then((data) => resolve(data))
          .catch((err) => reject(err));
      } catch (error) {
        reject(error);
        throw new Error(error);
      }
    });
  };
}
