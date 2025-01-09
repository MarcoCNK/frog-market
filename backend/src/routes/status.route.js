import express from 'express'
import {postPingController} from '../controllers/status.controller.js' 

const statusRouter = express.Router()

statusRouter.post('/', postPingController)

export default statusRouter