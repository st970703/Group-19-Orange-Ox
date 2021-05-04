import express from 'express';

const router = express.Router();

import api from './api';
router.use('/api', api);

router.get('/', (req, res) => {
  res.send('test');
});

export default router;