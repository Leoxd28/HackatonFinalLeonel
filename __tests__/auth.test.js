const request = require('supertest');
const app = require('../src/app');

describe('Rutas de Auth (smoke test)', () => {
  it('GET / debe responder con mensaje de API funcionando', async () => {
    const res = await request(app).get('/');
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('message');
  });
});
