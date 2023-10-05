const express = require('express');

const postsRouter = express.Router();

const { getPosts } = require('../controllers/posts.controller');

const authMiddleware = require('../middlewares/auth.middleware');

postsRouter.get('/', authMiddleware, getPosts);

module.exports = postsRouter;
