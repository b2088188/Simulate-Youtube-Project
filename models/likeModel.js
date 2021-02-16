import mongoose from 'mongoose'
import Video from './videoModel.js';

const likeSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    videoId: {
        type: String,
        required: [true, 'A like must have a video Id']
    },
    title: {
        type: String,
        required: [true, 'A like must have a title']
    },
    channelTitle: {
        type: String,
        required: [true, 'A like must have a channel Title']
    },
    image: String,
    publishAt: Date,
    createdAt: {
        type: Date,
        default: Date.now,
        selected: false
    }
})

likeSchema.index({user: 1, videoId: 1}, {unique: true});

likeSchema.post('save', async function () {
    const video = await Video.findOne({videoId: this.videoId});
    await Video.findByIdAndUpdate(video._id, {likes: video.likes + 1});
})

likeSchema.pre(/^delete/, async function (next) {
   this.l = await this.findOne();
   next();
})

likeSchema.post(/^delete/, async function () {
    const video = await Video.findOne({videoId: this.l.videoId});
     await Video.findByIdAndUpdate(video._id, {likes: video.likes - 1});
})

const Like = mongoose.model('Like', likeSchema);

export default Like;