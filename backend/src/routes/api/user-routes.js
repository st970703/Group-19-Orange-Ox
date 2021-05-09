import express from 'express';
import * as userDao from '../../db/user-dao';
import mongoose from 'mongoose';

const HTTP_CREATED = 201;
const HTTP_NOT_FOUND = 404;
const HTTP_NO_CONTENT = 204;
const HTTP_BAD_REQUEST = 400;

const router = express.Router();

router.use('/:id', async (req, res, next) => {
  const {id} = req.params;
  if (mongoose.isValidObjectId(id)) {
    next();
  }
  else {
    res.status(HTTP_BAD_REQUEST)
      .contentType('text/plain').send('Invalid ID');
  }
});

// Create user
router.post('/', async (req, res) => {
  if (!req.body.username) {
    res.status(HTTP_BAD_REQUEST)
      .contentType('text/plain').send('New users must have a username');
    return;
  }
  if (!req.body.password) {
    res.status(HTTP_BAD_REQUEST)
      .contentType('text/plain').send('New users must have a password');
    return;
  }
  const newUser = await userDao.createUser(req.body);
  res.status(HTTP_CREATED)
    .header('location', `/api/user/${newUser._id}`)
    .json(newUser);
});

// Retrieve user
router.get('/:id', async (req, res) => {
  const {id} = req.params;
  const user = await userDao.retrieveUser(id);
  if (user) {
    res.json(user);
  }
  else {
    res.sendStatus(HTTP_NOT_FOUND);
  }
});

// Update user
router.put('/:id', async (req, res) => {
  const {id} = req.params;
  const user = {
    ...req.body,
    _id: id
  };
  const success = await userDao.updateUser(user);
  res.sendStatus(success ? HTTP_NO_CONTENT : HTTP_NOT_FOUND);
});

// Delete user
router.delete('/:id', async (req, res) => {
  const {id} = req.params;
  await userDao.deleteUser(id);
  res.sendStatus(HTTP_NO_CONTENT);
});

router.get('/', (req, res) => {
  res.send('User route is working');
});

export default router;