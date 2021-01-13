import Video from '../models/videoModel.js'
import catchAsync from '../utils/catchAsync.js'
import AppError from '../utils/appError.js'
import {getAll, getOne} from './handlerFactory.js';

export const getAllVideos = getAll(Video, {path: 'channel', select: 'title image'});

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