const express = require('express');

const app = express();

// use .env
const dotenv = require('dotenv');
dotenv.config();

// set port
const port = process.env.PORT;

const cookieParser = require('cookie-parser');

// set routers
const authRouter = require('./routes/auth.routes');
const postsRouter = require('./routes/posts.routes');

// middlewares
app.use(express.json());
app.use(cookieParser());

// use routers
app.use('/auth', authRouter);
app.use('/posts', postsRouter);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
