import express from'express'
import { protect } from'../controllers/authController.js'
import { addSubscribe, getSubscribes, checkSubscribeExist, deleteSubscribe } from'../controllers/subscribeController.js'
const router = express.Router();


router.use(protect);
router.route('/')
    .get(getSubscribes)
    .post(addSubscribe);

// router.route('/:id')           
router.get('/:channelId', checkSubscribeExist);
router.delete('/:id', deleteSubscribe)


export default router;