const express = require('express');

const authRouter = express.Router();

const { login, refresh } = require('../controllers/auth.controller');

const authMiddleware = require('../middlewares/auth.middleware');

authRouter.post('/login', login);
authRouter.post('/refresh', authMiddleware, refresh);

module.exports = authRouter;
