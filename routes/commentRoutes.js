import express from 'express'
const router = express.Router({mergeParams: true});
import { addComment, getComments, updateComment, deleteComment } from '../controllers/commentController.js'
import { protect } from '../controllers/authController.js'


router.use(protect);

router.route('/')
           .post(addComment)
           .get(getComments)
router.patch('/:id', updateComment)
router.delete('/:id', deleteComment)



export default router;