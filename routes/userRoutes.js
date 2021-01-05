import express from'express'
import {updateMe, getMe, getUser, uploadUserPhoto, resizeUserPhoto} from'../controllers/userController.js'
import {protect} from'../controllers/authController.js'
const router = express.Router();

router.use(protect);
router.patch('/updateMe', uploadUserPhoto, resizeUserPhoto, updateMe);
router.get('/me', getMe, getUser);

export default router;      