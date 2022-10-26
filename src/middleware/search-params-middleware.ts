import { RequestHandler } from 'express';

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Express {
    export interface Request {
      searchParams: URLSearchParams;
    }
  }
}

export const searchParamsMiddleware: RequestHandler = (req, res, next) => {
  const searchParams = new URLSearchParams(req.query as Record<string, string>);

  req.searchParams = searchParams;
  next();
};
