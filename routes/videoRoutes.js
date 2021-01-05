import express from'express'
import {getAllVideos, getVideo} from'../controllers/videoController.js'
const router = express.Router();


router.get('/', getAllVideos);

router.get('/:videoId', getVideo);

export default router;      