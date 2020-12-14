const Home = require('../models/homeModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

exports.createHomeVideo = catchAsync(async (req, res, next) => {
    const video = await Home.create(req.body);
    res.status(201).json({
        status: 'success',
        data: {
            video
        }
    })
});

exports.getHomeVideos = catchAsync(async (req, res, next) => {
    const videos = await Home.find();
    res.status(200).json({
        status: 'success',
        data: {
            videos
        }
    })
})

exports.deleteLike = catchAsync(async (req, res, next) => {
    const like = await Home.deleteOne({ userId: req.user._id, videoId: req.params.id });
    if (!like)
        return next(new AppError('No like found with that Id', 404));
    res.status(201).json({
        status: 'success',
        message: null
    })
});