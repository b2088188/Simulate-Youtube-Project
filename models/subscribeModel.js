import mongoose from 'mongoose'

const subscribeSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: [true, 'Subscription must belong to a user']
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

// subscribeSchema.index({channelId: 1}, {unique: true});

const Subscribe = mongoose.model('Subscribe', subscribeSchema);

export default Subscribe;