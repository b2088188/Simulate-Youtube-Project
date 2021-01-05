import express from 'express'
import { addComment, getComments, updateComment, deleteComment } from '../controllers/commentController.js'
import { protect } from '../controllers/authController.js'
const router = express.Router();

router.route('/:videoId')
    .get(getComments)

router.use(protect);

router.route('/')
    .post(addComment)
router.patch('/:id', updateComment)
router.delete('/:id', deleteComment)



export default router;