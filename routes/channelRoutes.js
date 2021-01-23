import express from 'express'
const router = express.Router();
import videoRouter from './videoRoutes.js';
import { createChannel, getChannel } from '../controllers/channelController.js'


router.use('/:channelId/videos', videoRouter);

router.route('/')
			.post(createChannel)			

router.route('/:channelId')
			.get(getChannel)



export default router;
