import path from 'path';
import express, { Express } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import logger from 'morgan';

import { errorMiddleware } from './middleware/error-middleware';
import { searchParamsMiddleware } from './middleware/search-params-middleware';

const IS_DEV = process.env.NODE_ENV === 'development';
const YEAR_IN_MS = 365 * 24 * 60 * 60 * 1000;
const PUBLIC_DIR = path.resolve(process.cwd(), 'public');

const app: Express = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(
  helmet({
    // non-dev domain, automatically redirects to https: https://tools.ietf.org/html/rfc2606
    // https://github.com/helmetjs/helmet/issues/237
    // use custom CSP
    contentSecurityPolicy: false,
    crossOriginEmbedderPolicy: false,
    // crossOriginOpenerPolicy: false,
    // https://resourcepolicy.fyi/
    // crossOriginResourcePolicy: false,
  }),
);
app.use(logger(IS_DEV ? 'dev' : 'combined'));
app.disable('etag');

app.use(searchParamsMiddleware);

app.use('/public', express.static(PUBLIC_DIR, { maxAge: YEAR_IN_MS }));

app.get('/healthz', (req, res) => {
  res.send({ message: 'Ok!' });
});

app.use(errorMiddleware);

export default app;
