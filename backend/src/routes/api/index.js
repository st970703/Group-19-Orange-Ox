import express from 'express';

const router = express.Router();

import user from './users-routes';
router.use('/user', user);

export default router;