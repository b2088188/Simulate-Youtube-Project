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
	const commentLike = await CommentLike.deleteOne({_id: req.params.likeId});
	if(!commentLike)
		return next(new AppError('No commentLike found with that Id', 404));
	res.status(204).json({
		status: 'success'
	})
})

