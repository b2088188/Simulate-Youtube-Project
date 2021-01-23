import Subscribe from '../models/subscribeModel.js'
import catchAsync from '../utils/catchAsync.js'
import AppError from '../utils/appError.js'
import {createOne, getOneByUserAndParam} from './handlerFactory.js'


export const addSubscribe = catchAsync(async (req, res, next) => {
    const userId = req.params.userId ? req.params.userId : req.user._id;
    let subscribe = new Subscribe({ user: userId, ...req.body });
    subscribe =  await subscribe.save(function (err, subscribe) {
        subscribe.populate({
        path: 'channel',
        select: 'channelId title image'
    }, function(err, subscribe) {
        res.status(201).json({
            status: 'success',
            data: {
                subscribe
            }
        })
    })
    });
});

export const getSubscribes = catchAsync(async (req, res, next) => {
    const userId = req.params.userId ? req.params.userId : req.user._id;
    const subscribes = await Subscribe.find({ user: userId }).populate({
        path: 'channel',
        select: 'channelId title image'
    })
    res.status(200).json({
        status: 'success',
        data: {
            subscribes
        }
    })
})


export const getSubscribe = catchAsync(async (req, res, next) => {
    const userId = req.params.userId ? req.params.userId : req.user._id;
    const subscribe = await Subscribe.findOne({ user: userId, channel: req.params.channelId }).populate({
        path: 'channel',
        select: 'channelId title image'
    })
    res.status(200).json({
        status: 'success',
        data: {
            subscribe
        }
    })
})

export const deleteSubscribe = catchAsync(async (req, res, next) => {
    const userId = req.params.userId ? req.params.userId : req.user._id;
    const subscribe = await Subscribe.findOneAndRemove({user: userId, channel: req.params.channelId});
    if (!subscribe)
        return next(new AppError('Subscribe not found', 404));  
    res.status(204).json({
        status: 'success'
    })
});

