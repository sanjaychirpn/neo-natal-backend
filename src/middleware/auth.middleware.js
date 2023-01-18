import jwt from 'jsonwebtoken';
import { responseStatus } from '../helper/response.js';
import { msg } from '../helper/message.js';

const isLoginCheck = (req, res, next) => {
  let token = '';
  try {
    token =
      req.cookies?.token || req.header('Authorization')?.replace('Bearer ', '');
    if (!token) {
      return responseStatus(
        res,
        403,
        `token not found in req.header('Authorization')`,
        null
      );
    }

    const decode = jwt.verify(token, process.env.JWT_SECRET);
    if (!decode) {
      return responseStatus(res, 400, `Invalid token!`, null);
    }
    req.user = decode;

    return next();
  } catch (error) {
    console.log(error);
    return responseStatus(res, 500, `Error verifying the token!`, error);
  }
};

export { isLoginCheck };
