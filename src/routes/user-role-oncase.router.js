import express from 'express';
import { UserRoleOnCaseController } from '../controllers/user-role-oncase.controller.js';
let userRoleOnCaseRouter = express.Router();

let userRoleOnCaseController = new UserRoleOnCaseController();

userRoleOnCaseRouter
  .route('/')
  .get(userRoleOnCaseController.list)
  .post(userRoleOnCaseController.save);

userRoleOnCaseRouter
  .route('/id/:id')
  .get(userRoleOnCaseController.getById)
  .put(userRoleOnCaseController.update)
  .delete(userRoleOnCaseController.delete);

export default userRoleOnCaseRouter;
