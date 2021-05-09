import axios from 'axios';
import express from 'express';

describe('Express Route Testing', () => {
  let app;
  let server;

  beforeAll(async done => {
    app = express();
    app.get('/', (req, res) => {
      res.send('Test');
    });
    server = app.listen(3002, () => done());
  });

  afterAll(done => {
    server.close(async () => {
      done();
    });
  });

  it('should launch test server', async () => {
    const response = await axios.get('http://localhost:3002/');
    expect(response.data).toBe('Test');
  });
});