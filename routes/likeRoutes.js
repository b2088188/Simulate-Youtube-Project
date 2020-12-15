const express = require('express');
const router = express.Router();
const { protect } = require('../controllers/authController');
const { getLikes, createLike, deleteLike, checkLikeExist } = require('../controllers/likeController');

router.use(protect);

router.route('/')
    .get(getLikes)
    .post(createLike);

router.route('/:id')
    .delete(deleteLike)

router.get('/:videoId', checkLikeExist);    

module.exports = router;