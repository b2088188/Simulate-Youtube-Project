import express from 'express'
const router = express.Router();
import { createChannel } from '../controllers/channelController.js'



router.post('/', createChannel)


export default router;