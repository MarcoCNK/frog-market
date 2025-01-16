import express from 'express'
import { getUserController } from '../controllers/users.controller.js'

const userRouter = express.Router()

userRouter.get('/get-user/:access_token', getUserController)


export default userRouter