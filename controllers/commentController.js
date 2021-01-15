import Comment from '../models/commentModel.js'
import Video from '../models/videoModel.js';
import catchAsync from '../utils/catchAsync.js'
import AppError from '../utils/appError.js'
import {createOne} from './handlerFactory.js'

export const getComments = catchAsync(async (req, res, next) => {
    const comments = await Comment.find({ videoId: req.params.videoId });
    res.status(200).json({
        status: 'success',
        data: {
            comments
        }
    })
})



export const addComment = catchAsync(async (req, res, next) => {     
    const video = await Video.find({videoId: req.params.videoId});    
    if(video.length<1)
        return next(new AppError('No comment found with that Id', 404));
    let comment = new Comment({ user: req.user._id, videoId: req.params.videoId, ...req.body });
    comment =  await comment.save(function (err, comment) {
        comment.populate({
        path: 'user',
        select: 'name photo'
    }, function(err, comment) {
        res.status(201).json({
            status: 'success',
            data: {
                comment
            }
        })
    })
    });
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
    if (comment.user._id.toString() != req.user._id)
        return next(new AppError('Not Authorized', 401));
    await Comment.findByIdAndRemove(req.params.id);
    res.status(204).json({
        status: 'success'
    })
});