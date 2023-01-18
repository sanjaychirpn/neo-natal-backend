import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { responseStatus } from '../helper/response.js';
let otherRouter = express.Router();

otherRouter.route('/').all((req, res) => {
  try {
    const __dirname = path.dirname(fileURLToPath(import.meta.url));
    res.sendFile(__dirname.replace('/routes', '') + '/views/index.html');
  } catch (error) {
    responseStatus(res, 200, `Welcome to Neonatal`, null);
  }
});

otherRouter.route('/check').all((req, res) => {
  res.json({
    data: {
      host: req.host,
      originalUrl: req.originalUrl,
      protocol: req.protocol,
    },
  });
});

otherRouter.route('/*').all((req, res) => {
  responseStatus(res, 404, `Path ${req.path} not found`, null);
});

export default otherRouter;
