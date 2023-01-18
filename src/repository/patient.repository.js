import PatientModel from '../models/patient.model.js';

export class PatientRepository {
  findByEmail = async (email) => {
    return new Promise(async (resolve, reject) => {
      try {
        PatientModel.findOne({ email })
          .then((data) => resolve(data))
          .catch((err) => reject(err));
      } catch (error) {
        reject(error);
        throw new Error(error);
      }
    });
  };

  save = async (newEntry) => {
    return new Promise(async (resolve, reject) => {
      try {
        const data = new PatientModel(newEntry);
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
        PatientModel.findById(id)
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
        PatientModel.find(filter)
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
        PatientModel.countDocuments(filter)
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
        PatientModel.findByIdAndDelete(id)
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
        let xRayImages = newData?.xRayImages || [];
        let vitalsImages = newData?.vitalsImages || [];
        delete newData.vitalsImages;
        delete newData.xRayImages;
        let query = {
          $set: newData,
          $push: {
            xRayImages: { $each: xRayImages },
            vitalsImages: { $each: vitalsImages },
          },
        };

        PatientModel.findByIdAndUpdate(id, query, { new: true })
          .then((data) => resolve(data))
          .catch((err) => reject(err));
      } catch (error) {
        reject(error);
        throw new Error(error);
      }
    });
  };

  deleteImages = async (ids) => {
    return new Promise(async (resolve, reject) => {
      try {
        let xRayImageUrl = ids?.xRayImageUrl || undefined;
        let vitalsImageUrl = ids?.vitalsImageUrl || undefined;
        let patientId = ids?.patientId || undefined;
        let query = {
          $pull: {
            vitalsImages: vitalsImageUrl,
            xRayImages: xRayImageUrl,
          },
        };
        PatientModel.findByIdAndUpdate(patientId, query, { new: true })
          .then((data) => resolve(data))
          .catch((err) => reject(err));
      } catch (error) {
        reject(error);
        throw new Error(error);
      }
    });
  };
}
