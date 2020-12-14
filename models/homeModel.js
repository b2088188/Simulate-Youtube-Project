const mongoose = require('mongoose');

const homeSchema = new mongoose.Schema({
    videoId: {
        type: String,
        required: [true, 'A video must have a video Id']
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
    videoImage: String,
    channelImage: String,
    createdDate: {
        type: Date,
        default: Date.now(),
        selected: false
    }
})

const Home = mongoose.model('Home', homeSchema);

module.exports = Home;