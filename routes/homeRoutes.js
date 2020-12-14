const express = require('express');
const router = express.Router();
const { getHomeVideos, createHomeVideo } = require('../controllers/homeController');

router.route('/')
    .get(getHomeVideos)
    .post(createHomeVideo);


module.exports = router;