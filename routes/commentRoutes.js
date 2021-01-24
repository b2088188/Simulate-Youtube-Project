import express from 'express'
const router = express.Router({mergeParams: true});
import { addComment, getComments, updateComment, deleteComment } from '../controllers/commentController.js'
import { protect } from '../controllers/authController.js'



router.route('/')
           .post(protect, addComment)
           .get(getComments)
router.use(protect);
router.route('/:commentId')
.patch(updateComment)
.delete(deleteComment)



export default router;