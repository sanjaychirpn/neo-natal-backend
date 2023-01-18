import PatientCaseModel from '../models/patient-case.model.js';

export class PatientCaseRepository {
  save = async (newEntry) => {
    return new Promise(async (resolve, reject) => {
      try {
        const data = new PatientCaseModel(newEntry);
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

  findById = async (id) => {
    return new Promise(async (resolve, reject) => {
      try {
        PatientCaseModel.findById(id)
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
        PatientCaseModel.find(filter)
          .populate({
            path: 'patientId',
            select: ['name', 'age'],
          })
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
        reject(error);
        throw new Error(error);
      }
    });
  };

  countDocuments = async (filter) => {
    return new Promise(async (resolve, reject) => {
      try {
        PatientCaseModel.countDocuments(filter)
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
        PatientCaseModel.findByIdAndDelete(id)
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

        PatientCaseModel.findByIdAndUpdate(id, query, { new: true })
          .then((data) => resolve(data))
          .catch((err) => reject(err));
      } catch (error) {
        reject(error);
        throw new Error(error);
      }
    });
  };
}
