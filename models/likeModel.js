import mongoose from 'mongoose'

const likeSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    videoId: {
        type: String,
        required: [true, 'A like must have a video Id']
    },
    channelId: {
        type: String,
        required: [true, 'A like must have a channel Id']
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
    publishDate: Date,
    createdDate: {
        type: Date,
        default: Date.now(),
        selected: false
    }
})

const Like = mongoose.model('Like', likeSchema);

export default Like;