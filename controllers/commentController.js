const Comment = require('../models/commentModel')
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

exports.getComments = catchAsync(async (req, res, next) => {
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

exports.addComment = catchAsync(async (req, res, next) => {
    const newComment = await Comment.create({ userId: req.user._id, name: req.user.name, ...req.body });
    res.status(200).json({
        status: 'success',
        data: {
            comment: newComment
        }
    })
});

exports.updateComment = catchAsync(async (req, res, next) => {
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

exports.deleteComment = catchAsync(async (req, res, next) => {
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