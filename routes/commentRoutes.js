const express = require('express');
const router = express.Router();
const { addComment, getComments, updateComment, deleteComment } = require('../controllers/commentController')
const { protect } = require('../controllers/authController')

router.route('/')
    .post(protect, addComment)
router.route('/:videoId')
    .get(getComments)

router.patch('/:id', protect, updateComment)
router.delete('/:id', protect, deleteComment)



module.exports = router;