const express = require('express');
const router = express.Router();
const { signup, login, logout, isLoggedIn } = require('../controllers/authController');



router.get('/', isLoggedIn)

router.post('/signup', signup)
router.post('/login', login)
router.get('/logout', logout)

module.exports = router;