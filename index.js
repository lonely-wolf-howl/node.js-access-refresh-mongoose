const express = require('express');

const app = express();

const mongoose = require('mongoose');

// .env
const dotenv = require('dotenv');
dotenv.config();

// set port
const port = process.env.PORT;

const cookieParser = require('cookie-parser');

// set routers
const usersRouter = require('./routes/users.routes');
const postsRouter = require('./routes/posts.routes');
const productsRouter = require('./routes/products.routes');

// middlewares
app.use(express.json());
app.use(cookieParser());

// connect to database
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.log(error);
  });

// error handling
app.use('/sync', (req, res) => {
  throw new Error('sync error');
});
app.use('/async', (req, res, next) => {
  setImmediate(() => {
    next(new Error('async error'));
  });
});
app.use((error, req, res, next) => {
  res.json({ message: error.message });
});

// use routers
app.use('/users', usersRouter);
app.use('/posts', postsRouter);
app.use('/products', productsRouter);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
