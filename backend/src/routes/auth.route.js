import express from 'express'
import { registerController, verifyEmailController, loginController, forgotPasswordController, recoveryPasswordController, logoutController } from '../controllers/auth.controller.js'
import cors from 'cors'
import corsOptions from '../helpers/utils/corsOptions.js'
import authMiddleware from '../middlewares/auth.middleware.js'


const authRouter = express.Router()

authRouter.post('/register',  registerController)
authRouter.options('/register', cors(corsOptions))

authRouter.post('/login', loginController)
authRouter.options('/login', cors(corsOptions))

authRouter.get('/verify-email/:validation_token', verifyEmailController)
authRouter.options('/verify-email/:validation_token', cors(corsOptions))

authRouter.post('/forgot-password', forgotPasswordController)
authRouter.options('/forgot-password', cors(corsOptions))

authRouter.put('/recovery-password/:reset_token', recoveryPasswordController)
authRouter.options('/recovery-password/:reset_token', cors(corsOptions))

authRouter.get('/logout', authMiddleware(['admin', 'user']), logoutController)
authRouter.options('/logout', cors(corsOptions))


export default authRouter