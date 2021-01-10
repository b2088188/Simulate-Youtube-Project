import express from'express'
import { protect } from'../controllers/authController.js'
import { addSubscribe, getSubscribes, getSubscribe, deleteSubscribe } from'../controllers/subscribeController.js'
const router = express.Router();


router.use(protect);
router.route('/')
    .get(getSubscribes)
    .post(addSubscribe);
   
router.route('/:channelId')
            .get(getSubscribe)
            .delete(deleteSubscribe)



export default router;