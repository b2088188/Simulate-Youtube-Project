import Like from '../models/likeModel.js'
import catchAsync from '../utils/catchAsync.js'
import AppError from '../utils/appError.js'


export const createLike = catchAsync(async (req, res, next) => {
    const userId = req.params.userId ? req.params.userId : req.user._id;
    const like = await Like.create({ user: userId, ...req.body });
    res.status(201).json({
        status: 'success',
        data: {
            like
        }
    })
});

export const getLikes = catchAsync(async (req, res, next) => {
    const userId = req.params.userId ? req.params.userId : req.user._id;
    const likes = await Like.find({ user: userId });
    res.status(200).json({
        status: 'success',
        data: {
            likes
        }
    })
})

export const getLike = catchAsync(async (req, res, next) => {
    const userId = req.params.userId ? req.params.userId : req.user._id;
    const like = await Like.findOne({ user: userId, videoId: req.params.videoId });
    res.status(200).json({
        status: 'success',
        data: {
            like
        }
    })
})

export const deleteLike = catchAsync(async (req, res, next) => {
    const userId = req.params.userId ? req.params.userId : req.user._id;
    const like = await Like.deleteOne({ user: userId, videoId: req.params.videoId });
    if (!like)
        return next(new AppError('No like found with that Id', 404));
    res.status(204).json({
        status: 'success'
    })
});


