import express from 'express';
import * as userDao from '../../db/user-dao';
import mongoose from 'mongoose';

const HTTP_CREATED = 201;
const HTTP_NOT_FOUND = 404;
const HTTP_NO_CONTENT = 204;
const HTTP_BAD_REQUEST = 400;

const router = express.Router();

router.get('/', async (req, res) => {
  const users = await userDao.retrieveAllUsers();
  if (users) res.json(users);
  else res.sendStatus(HTTP_NOT_FOUND);
});

router.post('/', async (req, res) => {
  const newUser = await userDao.createUser(req.body);
})

router.get('/:email', async (req, res) => {
  const {email} = req.params;
  const user = await userDao.retrieveUser(email);
  if (user) res.json(todo);
  else res.sendStatus(HTTP_NOT_FOUND);
});

export default router;