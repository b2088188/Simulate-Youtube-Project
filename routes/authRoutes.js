import express from 'express'
const router = express.Router();
import { signup, login, logout, isLoggedIn } from '../controllers/authController.js'



router.get('/', isLoggedIn)

router.post('/signup', signup)
router.post('/login', login)
router.get('/logout', logout)

export default router;