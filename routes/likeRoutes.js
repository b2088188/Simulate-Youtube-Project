import express from'express'
import { protect } from'../controllers/authController.js'
import { getLikes, createLike, deleteLike, checkLikeExist } from'../controllers/likeController.js'
const router = express.Router();

router.use(protect);

router.route('/')
    .get(getLikes)
    .post(createLike);

router.route('/:id')
    .delete(deleteLike)

router.get('/:videoId', checkLikeExist);    

export default router;