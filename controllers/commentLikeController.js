import catchAsync from '../utils/catchAsync.js';
import CommentLike from '../models/commentLikeModel.js';
import AppError from '../utils/appError.js'


export const getCommentLikes = catchAsync(async (req, res, next) => {
	const commentLikes = await CommentLike.find({user: req.params.userId});
	res.status(200).json({
		status: 'success',
		data: {
			commentLikes
		}
	})
})

export const createCommentLike = catchAsync(async (req, res, next) => {
	const commentLike = await CommentLike.create({user: req.user._id, comment: req.params.commentId});
	res.status(201).json({
		status: 'success'
	})
})

export const removeCommentLike = catchAsync(async function (req, res, next) {
	await CommentLike.findByIdAndRemove(req.params.likeId);
	res.status(204).json({
		status: 'success'
	})
})

export const removeAllCommentLikeForComment = catchAsync(async (req, res, next) => {
	await CommentLike.deleteMany({comment: req.params.commentId});
	res.status(204).json({
		status: 'success'
	})
})