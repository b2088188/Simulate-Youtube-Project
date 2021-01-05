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
    createdAt: {
        type: Date,
        default: Date.now()
    }
})

commentSchema.pre(/^find/, function (next) {
    this.populate({
        path: 'user',
        select: 'name'
    })
    next();
})

const Comment = mongoose.model('Comment', commentSchema);

export default Comment;