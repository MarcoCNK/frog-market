import express from 'express'
import { registerController, verifyEmailController, loginController, forgotPasswordController } from '../controllers/auth.controller.js'

const authRouter = express.Router()

authRouter.post('/register', registerController)
authRouter.post('/login', loginController)
authRouter.get('/verify-email/:validation_token', verifyEmailController)
authRouter.post('/forgot-password', forgotPasswordController)



export default authRouter