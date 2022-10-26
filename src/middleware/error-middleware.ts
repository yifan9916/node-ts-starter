import { ErrorRequestHandler } from 'express';

export const errorMiddleware: ErrorRequestHandler = (error, req, res, next) => {
  res.status(error.status || 500).send({
    error: `ERROR: ${error.message}`,
  });
};
