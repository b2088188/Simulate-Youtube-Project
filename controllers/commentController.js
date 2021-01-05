import Comment from '../models/commentModel.js'
import catchAsync from '../utils/catchAsync.js'
import AppError from '../utils/appError.js'
import {createOne} from './handlerFactory.js'

export const getComments = catchAsync(async (req, res, next) => {
    const comments = await Comment.find({ videoId: req.params.videoId });
    // if(comments.length<1)
    //   return next(new AppError('Can\'t find any comments', 404));
    res.status(200).json({
        status: 'success',
        data: {
            comments
        }
    })
})



export const addComment = catchAsync(async (req, res, next) => {
    const newComment = await Comment.create({ user: req.user._id, ...req.body });
    res.status(200).json({
        status: 'success',
        data: {
            comment: newComment
        }
    })
});

export const updateComment = catchAsync(async (req, res, next) => {
    const comment = await Comment.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    });
    if (!comment)
        return next(new AppError('No comment found with that Id', 404));
    res.status(200).json({
        status: 'success',
        data: {
            comment
        }
    })
});

export const deleteComment = catchAsync(async (req, res, next) => {
    const comment = await Comment.findById(req.params.id);
    if (!comment)
        return next(new AppError('Comment not found', 404));
    if (comment.userId.toString() != req.user._id)
        return next(new AppError('Not Authorized', 401));
    await Comment.findByIdAndRemove(req.params.id);
    res.status(204).json({
        status: 'success'
    })
});