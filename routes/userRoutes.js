const express = require('express')
const {updateMe, getMe, getUser, uploadUserPhoto, resizeUserPhoto} = require('../controllers/userController');
const {protect} = require('../controllers/authController');
const router = express.Router();

router.use(protect);
router.patch('/updateMe', uploadUserPhoto, resizeUserPhoto, updateMe);
router.get('/me', getMe, getUser);

module.exports = router;			      