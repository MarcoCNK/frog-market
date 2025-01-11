import express from 'express'
import { createProductController } from '../controllers/product.controller'

const productRouter = express.Router()

productRouter.get('/create-product', createProductController)

export default productRouter