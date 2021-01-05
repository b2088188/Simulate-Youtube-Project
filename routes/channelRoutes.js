import express from 'express'
const router = express.Router();
import videoRouter from './videoRoutes.js';
import { createChannel, getChannelVideos } from '../controllers/channelController.js'



router.post('/', createChannel)

router.use('/:channelId/videos', getChannelVideos);


export default router;
