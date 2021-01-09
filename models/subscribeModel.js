import mongoose from 'mongoose'

const subscribeSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: [true, 'Subscription must belong to a user']
    },
    channel: {
        type: mongoose.Schema.ObjectId,
        ref: 'Channel',
        required: [true, 'Subscription must belong to a channel']
    },
    createdDate: {
        type: Date,
        default: Date.now(),
        selected: false
    }
})

subscribeSchema.index({user: 1, channel: 1}, {unique: true});

const Subscribe = mongoose.model('Subscribe', subscribeSchema);

export default Subscribe;