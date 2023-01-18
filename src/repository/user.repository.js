import UserModel from '../models/user.model.js';

export class UserRepository {
  findByEmail = async (email) => {
    return new Promise(async (resolve, reject) => {
      try {
        UserModel.findOne({ email })
          .then((data) => resolve(data))
          .catch((err) => reject(err));
      } catch (error) {
        reject(error);
        throw new Error(error);
      }
    });
  };

  save = async (newUser) => {
    return new Promise(async (resolve, reject) => {
      try {
        const user = new UserModel(newUser);
        user
          .save()
          .then((data) => {
            resolve(data);
          })
          .catch((err) => {
            console.log({ err });
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
        UserModel.findById(id)
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
        UserModel.find(filter)
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
        UserModel.countDocuments(filter)
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
        UserModel.findByIdAndDelete(id)
          .then((data) => resolve(data))
          .catch((err) => reject(err));
      } catch (error) {
        reject(error);
        throw new Error(error);
      }
    });
  };

  findByEmailAndUpdate = async (email, details) => {
    return new Promise(async (resolve, reject) => {
      try {
        UserModel.findOneAndUpdate(
          { email },

          { $set: { details } },
          {
            new: true,
          }
        )
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
        UserModel.findByIdAndUpdate(
          id,
          { $set: newData },
          {
            new: true,
          }
        )
          .then((data) => resolve(data))
          .catch((err) => reject(err));
      } catch (error) {
        reject(error);
        throw new Error(error);
      }
    });
  };
}
