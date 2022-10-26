import { RequestHandler } from 'express';

export const asyncHandler =
  (asyncFn: RequestHandler): RequestHandler =>
  async (req, res, next): Promise<void> => {
    try {
      asyncFn(req, res, next);
    } catch (error) {
      next(error);
    }
  };
