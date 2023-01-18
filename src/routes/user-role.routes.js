import express from 'express';
import { UserRoleController } from '../controllers/user-role.controller.js';
let userRoleRouter = express.Router();

let userRoleController = new UserRoleController();

userRoleRouter
  .route('/')
  .get(userRoleController.list)
  .post(userRoleController.save);

userRoleRouter
  .route('/id/:id')
  .get(userRoleController.getById)
  .put(userRoleController.update)
  .delete(userRoleController.delete);

export default userRoleRouter;
