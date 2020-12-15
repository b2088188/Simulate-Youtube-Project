const Subscribe = require('../models/subscribeModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const {createOne} = require('./handlerFactory');



exports.addSubscribe = catchAsync(async (req, res, next) => {
    const subscribe = await Subscribe.create({ userId: req.user._id, ...req.body });
    res.status(201).json({
        status: 'success',
        data: {
            subscribe
        }
    })
});

exports.getSubscribes = catchAsync(async (req, res, next) => {
    const user = req.user;
    const subscribes = await Subscribe.find({ userId: user._id });
    res.status(200).json({
        status: 'success',
        data: {
            subscribes
        }
    })
})

exports.deleteSubscribe = catchAsync(async (req, res, next) => {
    const subscribe = await Subscribe.findOneAndRemove({userId: req.user._id, channelId: req.params.id});
    if (!subscribe)
        return next(new AppError('Subscribe not found', 404));  
    res.status(204).json({
        status: 'success'
    })
});

exports.checkSubscribeExist = catchAsync(async (req, res, next) => {
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