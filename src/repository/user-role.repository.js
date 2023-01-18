import UserRoleModel from '../models/user-role.model.js';

export class UserRoleRepository {
  save = async (newEntry) => {
    return new Promise(async (resolve, reject) => {
      try {
        const data = new UserRoleModel(newEntry);
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
      console.log(id);
      try {
        UserRoleModel.find({ id })
          .then((data) => resolve(data))
          .catch((err) => reject(err));
      } catch (error) {
        reject(error);
        throw new Error(error);
      }
    });
  };

  countDocuments = async (filter) => {
    return new Promise(async (resolve, reject) => {
      try {
        UserRoleModel.countDocuments(filter)
          .exec()
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
        UserRoleModel.find(filter)
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

  findByIdAndDelete = async (id) => {
    return new Promise(async (resolve, reject) => {
      try {
        UserRoleModel.findByIdAndDelete(id)
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

        UserRoleModel.findByIdAndUpdate(id, query, { new: true })
          .then((data) => resolve(data))
          .catch((err) => reject(err));
      } catch (error) {
        reject(error);
        throw new Error(error);
      }
    });
  };
}
