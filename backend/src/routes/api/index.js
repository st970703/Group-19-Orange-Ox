import express from 'express';

const router = express.Router();

import user from './user-routes';
router.use('/user', user);

router.get('/', (req, res) => {
  res.send('API route is working!');
});

export default router;