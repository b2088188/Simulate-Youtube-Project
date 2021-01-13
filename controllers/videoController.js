import Video from '../models/videoModel.js'
import catchAsync from '../utils/catchAsync.js'
import AppError from '../utils/appError.js'
import {getOne} from './handlerFactory.js';

export const getAllVideos = catchAsync(async(req, res, next) => {	
	let queryTitle = req.query.q ? {title: {$regex: `${req.query.q}`, $options: 'i'}} : {};
	let query = Video.find({...queryTitle}).populate({
		path: 'channel',
		select: 'title'
	});
	query = query.select('-__v');
	const page = +req.query.page || 1;
	const limit = +req.query.limit || 5;
	const skip = (page - 1) * limit;
	query.skip(skip).limit(limit);	
	if(req.query.page){
		const numVideos = await Video.countDocuments();
		if(skip > numVideos)
			return next(new AppError('This page does not exist', 404));
	}

	const videos = await query;
	res.status(200).json({
		status: 'success',
		data: {
           videos
		}
	})
});



export const getVideo = catchAsync(async (req, res, next) => {
	
	const video = await Video.findOne({videoId: req.params.videoId}).populate({
		path: 'channel',
		select: 'channelId title image subscribes'
	});
	if(!video)
		return next(new AppError('No video found with that Id.', 404));
	res.status(200).json({
		status: 'success',
		data: {
			video
		}
	})
})