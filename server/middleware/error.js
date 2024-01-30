import httpStatus from 'http-status';
import yup, { ValidationError } from 'yup';
import { v4 as uuidv4 } from 'uuid';
import logger from '../config/logger.js';
import APIError from '../utils/APIError.js';


const handler = (err, req, res, next) => {
  const response = {
    statusCode: err.statusCode || httpStatus.INTERNAL_SERVER_ERROR,
    message: err.message || httpStatus[500],
    type: err.type,
    uuid: err.uuid,
  };
  if (!response.uuid) delete response.uuid;

  res.status(response.statusCode).json(response);
};

const converter = (err, req, res, next) => {
  let convertedError = err;
  if (err instanceof ValidationError) {
    convertedError = new APIError(
      httpStatus.BAD_REQUEST,
      err?.errors?.join(', ') || 'Validations have failed',
      'Validation Error'
    );
  } else if (!(err instanceof APIError)) {
    let uuid = uuidv4();
    logger.error({ uuid, ...err });
    convertedError = new APIError(
      err.statusCode || httpStatus.INTERNAL_SERVER_ERROR,
      httpStatus[500],
      'API Error 2',
      uuid
    );
  }

  return handler(convertedError, req, res, next);
};


const notFound = (req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`)
  res.status(404)
  next(error)
}


const errorHandler = (err, req, res, next) => {
  let statusCode = err.statusCode == 200 ? 500 : res.statusCode
  let message = err.message

  if (err.name === 'CastError' && err.KIND === 'ObjectId') {
    statusCode = 404
    message = 'Resource not found'
  }
  res.status(statusCode).json({
    message,
    stack: process.env.NODE_ENV === 'production' ? null : err.stack,
  })
}

export { notFound, errorHandler, handler, converter }