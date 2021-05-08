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
    // require('../routes/auth.routes')(app);
    // require('../routes/user.routes')(app);
    server = app.listen(3001, () => done());
  });

  afterAll(done => {
    server.close(async () => {
      done();
    });
  });

  it('should launch test server', async () => {
    const response = await axios.get('http://localhost:3001/');
    expect(response.data).toBe('Test');
  });
});