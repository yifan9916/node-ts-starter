import request from 'supertest';

import app from '../src/app';

test('healthcheck', async () => {
  const res = await request(app)
    .get('/healthz')
    .expect('Content-Type', /json/)
    .expect(200);

  expect(res.body).toEqual({ message: 'Ok!' });
});
