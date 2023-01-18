import express from 'express';
const userRouter = express.Router();
import { UserController } from '../controllers/user.controller.js';
import { isLoginCheck } from '../middleware/auth.middleware.js';
let userController = new UserController();

userRouter.route('/list').get(userController.listUsers);

userRouter.route('/signup').post(userController.save);
 
userRouter.route('/login').post(userController.login);

userRouter
  .route('/my-account')
  .get(isLoginCheck, userController.getLoggedInUser);

userRouter
  .route('/id/:id')
  .get(userController.getUserById)
  .put(userController.update)
  .delete(userController.delete);

userRouter.route('/search-by-email').get(userController.getUserByEmail);

export default userRouter;
