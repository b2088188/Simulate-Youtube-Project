import express from'express'
const router = express.Router();
import likeRouter from './likeRoutes.js';
import subscriptionRouter from './subscriptionRoutes.js';
import {updateMe, getMe, getUser, uploadUserPhoto, resizeUserPhoto} from'../controllers/userController.js'
import {protect} from'../controllers/authController.js'

router.use('/:userId/likes', likeRouter);
router.use('/:userId/subscriptions', subscriptionRouter);

router.use(protect);
router.patch('/updateMe', uploadUserPhoto, resizeUserPhoto, updateMe);
router.get('/me', getMe, getUser);

export default router;      