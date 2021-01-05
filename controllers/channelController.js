import Channel from '../models/channelModel.js';
import catchAsync from '../utils/catchAsync.js';
import AppError from '../utils/appError.js';
import {createOne} from './handlerFactory.js';

export const createChannel = catchAsync(async (req, res, next) => {
	const channel = await Channel.create(req.body);
	res.status(201).json({
		status: 'success',
		data: {
			channel
		}
	})
})