import Video from '../models/videoModel.js'
import catchAsync from '../utils/catchAsync.js'
import AppError from '../utils/appError.js'

export const getAllVideos = catchAsync(async(req, res, next) => {	
	let queryTitle = req.query.q ? {title: {$regex: `${req.query.q}`, $options: 'i'}} : {};
	let query = Video.find({...queryTitle}).populate({
		path: 'channel',
		select: 'title'
	});
	query = query.select('-__v');
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
		select: 'channelId title image'
	});
	if(!video)
		return next(new AppError('No video found with thatId', 404));
	res.status(200).json({
		status: 'success',
		data: {
			video
		}
	})
})