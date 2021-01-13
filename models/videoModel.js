import mongoose from 'mongoose';

const videoSchema = new mongoose.Schema({
	videoId: {
		type: String,
		required: [true, 'A video must have a videoId']
	},
	channel: {
		type: mongoose.Schema.ObjectId,
		ref: 'Channel',
		required: [true, 'A video must have a channel info']
	},
	title: {
		type: String,
		required: [true, 'A video must have a title']
	},
	description: {
		type: String,
		//required: [true, 'A video must have a description']
	},
	images: String,
	likes: {
		type: Number,
		default: 0
	},
	publishedAt: {
		type: Date,
		required: [true, 'A video must have a publish time']
	}
})

const Video = mongoose.model('Video', videoSchema);

export default Video;