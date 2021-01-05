import express from'express'
const router = express.Router({mergeParams: true});
import { protect } from'../controllers/authController.js'
import { getLikes, getLike, createLike, deleteLike } from'../controllers/likeController.js'

router.use(protect);

router.route('/')
    .get(getLikes)
    .post(createLike);

router.route('/:videoId')
            .get(getLike)
           .delete(deleteLike)

//router.get('/:videoId', checkLikeExist);    

export default router;