import Channel from '../models/channelModel.js';
import Video from '../models/videoModel.js';
import catchAsync from '../utils/catchAsync.js';
import AppError from '../utils/appError.js';
import {createOne} from './handlerFactory.js';

export const createChannel = createOne(Channel);

export const getChannelVideos = catchAsync(async (req, res, next) => {
	const channel = await Channel.findById(req.params.channelId);
	if(!channel)
		return next(new AppError('No channel found with that Id.', 404));
	const videos = await Video.find({channel: channel._id}) ;
	res.status(200).json({
		status: 'success',
		data: {
			channel,
			videos
		}
	})
})