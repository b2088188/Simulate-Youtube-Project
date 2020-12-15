const express = require('express');
const router = express.Router();
const { protect } = require('../controllers/authController');
const { addSubscribe, getSubscribes, checkSubscribeExist, deleteSubscribe } = require('../controllers/subscribeController');


router.use(protect);
router.route('/')
    .get(getSubscribes)
    .post(addSubscribe);

// router.route('/:id')           
router.get('/:channelId', checkSubscribeExist);
router.delete('/:id', deleteSubscribe)


module.exports = router;