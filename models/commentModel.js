const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    videoId: {
        type: String,
        required: [true, 'Comment need a videoId']
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required: [true, 'Comment need a userId']
    },
    name: {
        type: String,
        required: [true, 'Comment need a name']
    },
    comment: {
        type: String,
        required: [true, 'Comment must not be empty']
    },
    createdDate: {
        type: Date,
        default: Date.now()
    }
})

const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;