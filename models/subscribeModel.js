const mongoose = require('mongoose');

const subscribeSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    },
    channelId: {
        type: String,
        required: [true, 'A like must have a channel Id']
    },
    title: {
        type: String,
        required: [true, 'A like must have a title']
    },
    image: String,
    createdDate: {
        type: Date,
        default: Date.now(),
        selected: false
    }
})

const Subscribe = mongoose.model('Subscribe', subscribeSchema);

module.exports = Subscribe;