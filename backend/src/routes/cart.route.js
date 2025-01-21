import express from 'express'
import { addToCartController, eliminateProductCart, getAllCartProducts, checkoutController, checkoutRouterController } from '../controllers/cart.controller.js'
import authMiddleware from '../middlewares/auth.middleware.js'
import cookieParser from "cookie-parser";
import cors from 'cors'
import corsOptions from '../helpers/utils/corsOptions.js'
import crypto from 'crypto'

const cartRouter = express.Router()


cartRouter.use(cookieParser());

cartRouter.post('/add', authMiddleware(['admin','user']), addToCartController)
cartRouter.options('/add', cors(corsOptions))

cartRouter.delete('/:seller_id', authMiddleware(['admin', 'user']), eliminateProductCart )
cartRouter.options('/:seller_id', cors(corsOptions))


cartRouter.get('/', authMiddleware(['admin', 'user']), getAllCartProducts)
cartRouter.options('/', cors(corsOptions))

cartRouter.post('/checkout', authMiddleware(['admin', 'user']), checkoutController)
cartRouter.options('/checkout', cors(corsOptions))

cartRouter.get('/checkout-router/:checkoutId', authMiddleware(['admin', 'user']), checkoutRouterController)
cartRouter.options('/checkout-router/:checkoutId', cors(corsOptions))

export default cartRouter