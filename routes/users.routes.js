const express = require('express');

const usersRouter = express.Router();

const { login, refresh } = require('../controllers/users.controller');

const authMiddleware = require('../middlewares/auth.middleware');

usersRouter.post('/login', login);
usersRouter.post('/refresh', authMiddleware, refresh);

module.exports = usersRouter;
