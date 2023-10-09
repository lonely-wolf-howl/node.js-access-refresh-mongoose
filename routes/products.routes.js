const express = require('express');

const productsRouter = express.Router();

const {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} = require('../controllers/products.controller');

const authMiddleware = require('../middlewares/auth.middleware');

productsRouter.post('/', authMiddleware, createProduct);
productsRouter.get('/', authMiddleware, getAllProducts);
productsRouter.get('/:id', authMiddleware, getProductById);
productsRouter.put('/:id', authMiddleware, updateProduct);
productsRouter.delete('/:id', authMiddleware, deleteProduct);

module.exports = productsRouter;
