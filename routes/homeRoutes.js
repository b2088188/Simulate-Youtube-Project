import express from 'express'
import { getHomeVideos, createHomeVideo } from '../controllers/homeController.js'
const router = express.Router();

router.route('/')
    .get(getHomeVideos)
    .post(createHomeVideo);


export default router;