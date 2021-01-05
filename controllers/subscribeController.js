import Subscribe from '../models/subscribeModel.js'
import catchAsync from '../utils/catchAsync.js'
import AppError from '../utils/appError.js'
import {createOne} from './handlerFactory.js'



export const addSubscribe = catchAsync(async (req, res, next) => {
    const subscribe = await Subscribe.create({ userId: req.user._id, ...req.body });
    res.status(201).json({
        status: 'success',
        data: {
            subscribe
        }
    })
});

export const getSubscribes = catchAsync(async (req, res, next) => {
    const user = req.user;
    const subscribes = await Subscribe.find({ userId: user._id });
    res.status(200).json({
        status: 'success',
        data: {
            subscribes
        }
    })
})

export const deleteSubscribe = catchAsync(async (req, res, next) => {
    const subscribe = await Subscribe.findOneAndRemove({userId: req.user._id, channelId: req.params.id});
    if (!subscribe)
        return next(new AppError('Subscribe not found', 404));  
    res.status(204).json({
        status: 'success'
    })
});

export const checkSubscribeExist = catchAsync(async (req, res, next) => {
    const user = req.user;
    const subscribes = await Subscribe.findOne({ userId: user._id, channelId: req.params.channelId });
    if (!subscribes)
        return res.status(200).json({
            status: 'not found'
        })
    res.status(200).json({
        status: 'success',
        data: {
            subscribes
        }
    })
})