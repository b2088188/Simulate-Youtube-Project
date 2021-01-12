import mongoose from 'mongoose'

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
        default: Date.now(),
        selected: false
    }
})

likeSchema.index({user: 1, videoId: 1}, {unique: true});

const Like = mongoose.model('Like', likeSchema);

export default Like;