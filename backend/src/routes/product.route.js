import express from 'express'
import { createProductController, deleteProductController, getAllProductController, getProductByIdController, preflightCOntroller, updateProductController } from '../controllers/product.controller.js'
import authMiddleware from '../middlewares/auth.middleware.js'
import cors from 'cors'
import corsOptions from '../helpers/utils/corsOptions.js'

const productRouter = express.Router()

productRouter.get('/', authMiddleware(['admin','user']), getAllProductController)
productRouter.post('/', authMiddleware(['admin', 'user']), createProductController)
productRouter.options('/', cors(corsOptions))

productRouter.get('/:id',  authMiddleware(['admin','user']), getProductByIdController)
productRouter.delete('/:id', authMiddleware(['admin', 'user']), deleteProductController)
productRouter.put('/:id',  authMiddleware(['admin']), updateProductController)
productRouter.options('/:id', cors(corsOptions))



export default productRouter