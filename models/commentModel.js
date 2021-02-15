import mongoose from 'mongoose'

const commentSchema = new mongoose.Schema({
    videoId: {
        type: String,
        required: [true, 'Comment need a videoId']
    },
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: [true, 'Comment need a userId']
    },
    comment: {
        type: String,
        required: [true, 'Comment must not be empty']
    },
    likes: {
        type: Number,
        default: 0
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
})


const Comment = mongoose.model('Comment', commentSchema);

export default Comment;