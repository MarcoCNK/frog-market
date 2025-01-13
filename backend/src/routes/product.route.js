import express from 'express'
import { createProductController, deleteProductController, getAllProductController, getProductByIdController, updateProductController } from '../controllers/product.controller.js'
import authMiddleware from '../middlewares/auth.middleware.js'

const productRouter = express.Router()

productRouter.get('/', authMiddleware(['admin','user']), getAllProductController)
productRouter.get('/:id',  authMiddleware(['admin','user']), getProductByIdController)
productRouter.post('/', authMiddleware(['admin']), createProductController)
productRouter.delete('/:id', authMiddleware(['admin']), deleteProductController)
productRouter.put('/:id',  authMiddleware(['admin']), updateProductController)

export default productRouter