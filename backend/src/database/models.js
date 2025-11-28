const mongoose = require('mongoose');

// User Model - Done
const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    passwordHash: { type: String, required: true }
}, { timestamps: true });

// Podcast Model
const podcastSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    title: { type: String, required: true },
    description: String,
    coverImageUrl: String,
    category: String,
    language: String,
    explicit: { type: Boolean, default: false },
    rssFeedUrl: String,
    tags: [String]
}, { timestamps: true });

// Episode Model
const episodeSchema = new mongoose.Schema({
    podcast: { type: mongoose.Schema.Types.ObjectId, ref: 'Podcast', required: true },
    title: { type: String, required: true },
    description: String,
    audioUrl: { type: String, required: true },
    duration: Number,
    episodeNumber: Number,
    seasonNumber: Number,
    publishedAt: Date
}, { timestamps: true });


// // User Progress Model
// const userProgressSchema = new mongoose.Schema({
//     user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
//     episode: { type: mongoose.Schema.Types.ObjectId, ref: 'Episode', required: true },
//     currentTime: Number,
//     lastPlayedAt: Date,
//     isFinished: { type: Boolean, default: false }
// }, { timestamps: true });


// // Rating Model
// const ratingSchema = new mongoose.Schema({
//     user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
//     episode: { type: mongoose.Schema.Types.ObjectId, ref: 'Episode', required: true },
//     rating: { type: Number, required: true, min: 1, max: 5 }
// }, { timestamps: true });

// Export models
module.exports = {
    User: mongoose.model('User', userSchema),
    Podcast: mongoose.model('Podcast', podcastSchema),
    Episode: mongoose.model('Episode', episodeSchema),
    UserSubscription: mongoose.model('UserSubscription', userSubscriptionSchema),
    UserProgress: mongoose.model('UserProgress', userProgressSchema),
    Comment: mongoose.model('Comment', commentSchema),
    Rating: mongoose.model('Rating', ratingSchema)
};
