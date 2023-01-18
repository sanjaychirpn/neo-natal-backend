import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import expressFileupload from 'express-fileupload';
import cookieParser from 'cookie-parser';
import { cloudinaryConfig, dbConnect } from './config/index.js';
import {
  otherRouter,
  patientCaseRouter,
  patientRouter,
  userRouter,
  userRoleRouter,
  userRoleOnCaseRouter,
} from './routes/index.js';
cloudinaryConfig();
const port = process.env.PORT || 3000;

(async function () {
  //write your js code here
  const app = express();
  await dbConnect();
  app.use(express.json());
  app.use((req, res, next) => {
    console.log(`Protocol: ${req.protocol}`);
    next();
  });
  app.use(
    expressFileupload({
      useTempFiles: true,
      tempFileDir: '/tmp/',
      limits: { fileSize: 50 * 1024 * 1024 },
    })
  );
  app.use(express.urlencoded({ extended: false }));
  app.use(cors({}));
  app.use(morgan('dev'));
  app.use(cookieParser());

  app.use('/api/user', userRouter);
  app.use('/api/patient', patientRouter);
  app.use('/api/patient-case', patientCaseRouter);
  app.use('/api/user-role', userRoleRouter);
  app.use('/api/user-role-oncase', userRoleOnCaseRouter);
  app.use('/', otherRouter);

  app.listen(port);
  console.log(
    `----- NeoNatal Backend Server running at http://localhost:${port} -----`
  );
})();
