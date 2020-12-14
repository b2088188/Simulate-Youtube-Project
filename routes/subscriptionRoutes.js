const express = require('express');
const router = express.Router();
const { protect } = require('../controllers/authController');
const { addSubscribe, getSubscribes, checkSubscribeExist, deleteSubscribe } = require('../controllers/subscribeController');

router.route('/')
    .get(protect, getSubscribes)
    .post(protect, addSubscribe);

// router.route('/:id')           
router.get('/:channelId', protect, checkSubscribeExist);
router.delete('/:id', protect, deleteSubscribe)


module.exports = router;