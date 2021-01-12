import mongoose from 'mongoose';

const channelSchema = new mongoose.Schema({
	title: {
		type: String,
		required: [true, 'A channel must have a title']
	},
	image: String,
	publishedAt: {
		type: Date,
		required: [true, 'A channel must have a publish time']
	}
})

const Channel = mongoose.model('Channel', channelSchema);
export default Channel;