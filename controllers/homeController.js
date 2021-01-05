import Home from '../models/homeModel.js'
import catchAsync from '../utils/catchAsync.js'
import AppError from '../utils/appError.js'

export const createHomeVideo = catchAsync(async (req, res, next) => {
    const video = await Home.create(req.body);
    res.status(201).json({
        status: 'success',
        data: {
            video
        }
    })
});

export const getHomeVideos = catchAsync(async (req, res, next) => {
    const videos = await Home.find();
    res.status(200).json({
        status: 'success',
        data: {
            videos
        }
    })
})

export const deleteLike = catchAsync(async (req, res, next) => {
    const like = await Home.deleteOne({ userId: req.user._id, videoId: req.params.id });
    if (!like)
        return next(new AppError('No like found with that Id', 404));
    res.status(201).json({
        status: 'success',
        message: null
    })
});