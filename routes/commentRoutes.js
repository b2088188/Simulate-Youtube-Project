const express = require('express');
const router = express.Router();
const { addComment, getComments, updateComment, deleteComment } = require('../controllers/commentController')
const { protect } = require('../controllers/authController')

router.route('/:videoId')
    .get(getComments)

router.use(protect);

router.route('/')
    .post(addComment)
router.patch('/:id', updateComment)
router.delete('/:id', deleteComment)



module.exports = router;