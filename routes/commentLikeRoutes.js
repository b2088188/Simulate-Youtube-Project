import express from 'express';
import {protect} from '../controllers/authController.js';
import {getCommentLikes, createCommentLike, removeCommentLike, removeAllCommentLikeForComment } from '../controllers/commentLikeController.js';
const router = express.Router({mergeParams: true});


router.use(protect)

router.route('/')
			.get(getCommentLikes)
			.post(createCommentLike)
			.delete(removeAllCommentLikeForComment);

router.route('/:likeId')			
		   .delete(removeCommentLike);

export default router;