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
		required: [true, 'A video must have a description']
	},
	images: String,
	category: {
		type: String,
		required: [true, 'A video must belongs to a category'],
		enum: ['ASMR', 'React', 'JavaScript', 'Node', 'CSS', 'Bootstrap']
	},
	likes: {
		type: Number,
		default: 0
	},
	views: {
		type: Number,
		default: 0
	},
	createdAt: {
		type: Date,
		default: Date.now()
	}
})



 
// videoSchema.pre(/findOne/, async function (next) {
// 	console.log(this)
	// const [video] = await this.find();
 // const v = await Video.findById(video._id)
	// console.log(v)
	//await Video.findByIdAndUpdate(video._id, {views: video.views + 1});	
// 	next();
// })

const Video = mongoose.model('Video', videoSchema);

export default Video;