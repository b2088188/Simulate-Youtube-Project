import Subscribe from '../models/subscribeModel.js'
import catchAsync from '../utils/catchAsync.js'
import AppError from '../utils/appError.js'
import {createOne, getOneByUserAndParam} from './handlerFactory.js'


export const addSubscribe = catchAsync(async (req, res, next) => {
    let subscribe = new Subscribe({ user: req.user._id, ...req.body });
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
    
    const subscribes = await Subscribe.find({ user: req.user._id }).populate({
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
    const user = req.user;
    const subscribe = await Subscribe.findOne({ user: user._id, channel: req.params.channelId }).populate({
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
    const subscribe = await Subscribe.findOneAndRemove({user: req.user._id, channel: req.params.channelId});
    if (!subscribe)
        return next(new AppError('Subscribe not found', 404));  
    res.status(204).json({
        status: 'success'
    })
});

