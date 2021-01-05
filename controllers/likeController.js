import Like from '../models/likeModel.js'
import catchAsync from '../utils/catchAsync.js'
import AppError from '../utils/appError.js'

export const createLike = catchAsync(async (req, res, next) => {
    const newLike = await Like.create({ userId: req.user._id, ...req.body });
    res.status(201).json({
        status: 'success',
        data: {
            like: newLike
        }
    })
});

export const getLikes = catchAsync(async (req, res, next) => {
    const user = req.user;
    const likes = await Like.find({ userId: user._id });
    res.status(200).json({
        status: 'success',
        data: {
            likes
        }
    })
})

export const deleteLike = catchAsync(async (req, res, next) => {
    const like = await Like.deleteOne({ userId: req.user._id, videoId: req.params.id });
    if (!like)
        return next(new AppError('No like found with that Id', 404));
    res.status(201).json({
        status: 'success',
        message: null
    })
});


export const checkLikeExist = catchAsync(async (req, res, next) => {
    const user = req.user;
    const like = await Like.findOne({ userId: user._id, videoId: req.params.videoId });
    if (!like)
        return res.status(200).json({
            status: 'not found'
        })
    res.status(200).json({
        status: 'success',
        data: {
            like
        }
    })
})