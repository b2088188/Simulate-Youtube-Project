const express = require('express');
const router = express.Router();
const { protect } = require('../controllers/authController');
const { getLikes, createLike, deleteLike, checkLikeExist } = require('../controllers/likeController');

router.route('/')
    .get(protect, getLikes)
    .post(protect, createLike);

router.route('/:id')
    .delete(protect, deleteLike)

router.get('/:videoId', protect, checkLikeExist);    

module.exports = router;