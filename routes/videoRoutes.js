import express from'express'
const router = express.Router({mergeParams: true});
import commentRouter from './commentRoutes.js';
import {getAllVideos, getVideo} from'../controllers/videoController.js'

router.use('/:videoId/comments', commentRouter);


router.get('/', getAllVideos);

router.get('/:videoId', getVideo);

export default router;      