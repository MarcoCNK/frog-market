import express from 'express'
import { registerController, verifyEmailController, loginController, forgotPasswordController, recoveryPasswordController, retryPasswordController } from '../controllers/auth.controller.js'

const authRouter = express.Router()

authRouter.post('/register', registerController)
authRouter.post('/login', loginController)
authRouter.get('/verify-email/:validation_token', verifyEmailController)
authRouter.post('/forgot-password', forgotPasswordController)
authRouter.put('/recovery-password/:reset_token', recoveryPasswordController)
authRouter.post('/password-retry', retryPasswordController)





export default authRouter