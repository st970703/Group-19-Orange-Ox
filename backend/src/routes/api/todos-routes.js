import express from 'express';
import * as todosDao from '../../db/todos-dao';
import mongoose from 'mongoose';
import jwt_decode from "jwt-decode";
import checkJwt from "../../authz/check-jwt";


// const HTTP_OK = 200; // Not really needed; this is the default if you don't set something else.
const HTTP_CREATED = 201;
const HTTP_NO_CONTENT = 204;
const HTTP_BAD_REQUEST = 400;
const HTTP_UNAUTHORISED_ERROR = 401;
const HTTP_NOT_FOUND = 404;

const router = express.Router();

// TODO Exercise Four: Add your RESTful routes here.

const checkDBObjectId = async (req, res, next) => {
    const { id } = req.params;
    if (mongoose.isValidObjectId(id)) {
        next();
    } else {
        res.status(HTTP_BAD_REQUEST)
            .contentType('text/plain').send('Invalid ID');
    }
}

const getUserSub = (req) => {
    let userSub;
    let { authorization } = req.headers;

    authorization = authorization.replace(/^Bearer\s+/, "").trim();
    if (authorization) {
        try {
            userSub = jwt_decode(authorization).sub;
        } catch (err) {
            console.log(err);
        }
    }
    return userSub;
}


router.use('/', checkJwt);

router.use('/:id', checkDBObjectId, checkJwt);

// Create todo
router.post('/', async (req, res) => {
    if (!req.body.title) {
        res.status(HTTP_BAD_REQUEST)
            .contentType('text/plain').send('New todos must have a title');
        return;
    }

    const userSub = getUserSub(req);
    const newTodo = await todosDao.createTodo(req.body, userSub);

    if (newTodo) {
        res.status(HTTP_CREATED)
            .header('location', `/api/todos/${newTodo._id}`)
            .json(newTodo);
    } else {
        res.status(HTTP_UNAUTHORISED_ERROR)
            .contentType('text/plain').send('Unauthorised User');
    }
});

// Retrieve todo list
router.get('/', async (req, res) => {
    const userSub = getUserSub(req);

    res.json(await todosDao.retrieveAllTodos(userSub));
});

// Retrieve single todo
router.get('/:id', async (req, res) => {
    const { id } = req.params;

    const userSub = getUserSub(req);

    const todo = await todosDao.retrieveTodo(id, userSub);

    if (todo) {
        if (todo.userSub === userSub) {
            res.json(todo);
        } else {
            res.status(HTTP_UNAUTHORISED_ERROR)
                .contentType('text/plain').send('Unauthorised User');
        }
    } else {
        res.sendStatus(HTTP_NOT_FOUND);
    }
});

// Update todo
router.put('/:id', async (req, res) => {
    const { id } = req.params;

    const todo = {
        ...req.body,
        _id: id,
    };

    const userSub = getUserSub(req);
    const result = await todosDao.updateTodo(todo, userSub);

    if (result) {
        res.sendStatus(HTTP_NO_CONTENT);
    } else {
        res.status(HTTP_UNAUTHORISED_ERROR)
            .contentType('text/plain').send('Unauthorised User');
    }
});

// Delete todo
router.delete('/:id', async (req, res) => {
    const { id } = req.params;

    const userSub = getUserSub(req);
    const result = await todosDao.deleteTodo(id, userSub);

    if (result) {
        res.sendStatus(HTTP_NO_CONTENT);
    } else {
        res.status(HTTP_UNAUTHORISED_ERROR)
            .contentType('text/plain').send('Unauthorised User');
    }
})

export default router;