import mongoose from 'mongoose'
import Channel from './channelModel.js';

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
    createdAt: {
        type: Date,
        default: Date.now(),
        selected: false
    }
})

subscribeSchema.index({user: 1, channel: 1}, {unique: true});


subscribeSchema.post('save', async function () {
    const channel = await Channel.findById(this.channel);
    await Channel.findByIdAndUpdate(channel._id, {subscribes: channel.subscribes +1 });
})

subscribeSchema.pre(/findOneAndRemove/, async function (next) {
    this.s = await this.findOne();
    next();
})

subscribeSchema.post(/findOneAndRemove/, async function () {
    const channel = await Channel.findById(this.s.channel);
    await Channel.findByIdAndUpdate(channel._id, {subscribes: channel.subscribes - 1});
})

const Subscribe = mongoose.model('Subscribe', subscribeSchema);

export default Subscribe;