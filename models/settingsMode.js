const mongoose = require('mongoose');

const settingsSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },

    // account settings
    optIntoBeta: {
        type: Boolean,
        default: false
    },
    optOutRedesign: {
        type: Boolean,
        default: false
    },

    // privacy and security
    showInSearch: {
        type: Boolean,
        default: false
    },
    personalizeAds: {
        type: Boolean,
        default: false
    },
    alcohol: {
        type: Boolean,
        default: false
    },
    dating: {
        type: Boolean,
        default: false
    },
    gambling: {
        type: Boolean,
        default: false
    },
    pregnancyAndParenting: {
        type: Boolean,
        default: false
    },
    weightLoss: {
        type: Boolean,
        default: false
    },
    twoFactorAuthentication: {
        type: Boolean,
        default: false
    },

    // feed settings
    showMatureContent: {
        type: Boolean,
        default: false
    },
    blurMatureContent: {
        type: Boolean,
        default: false
    },
    enableHomeFeedRecs: {
        type: Boolean,
        default: false
    },
    autoPlay: {
        type: Boolean,
        default: false
    },
    reduceAnimations: {
        type: Boolean,
        default: false
    },
    communityThemes: {
        type: Boolean,
        default: false
    },
    communityContentSort: {
        type: String,
        enum: ['hot', 'new', 'top', 'rising']
    },
    rememberPerCommunity: {
        type: Boolean,
        default: false
    },
    globalContentView: {
        type: String,
        enum: ['card', 'classic', 'compact']
    },
    rememberPerCommunityView: {
        type: Boolean,
        default: false
    },
    openPostsInNewWindow: {
        type: Boolean,
        default: false
    },
    defaultToMarkdown: {
        type: Boolean,
        default: false
    },

    // notifications
    privateMessages: {
        type: Boolean,
        default: false
    },
    chatMessages: {
        type: Boolean,
        default: false
    },
    chatRequesets: {
        type: Boolean,
        default: false
    },
    mentionsOfUsername: {
        type: Boolean,
        default: false
    },
    commentsOnPosts: {
        type: Boolean,
        default: false
    },
    upvotesOnPosts: {
        type: Boolean,
        default: false
    },
    upvotesOnComments: {
        type: Boolean,
        default: false
    },
    repliesToComments: {
        type: Boolean,
        default: false
    },
    activityOnComments: {
        type: Boolean,
        default: false
    },
    activityOnChatPosts: {
        type: Boolean,
        default: false
    },
    newFollowers: {
        type: Boolean,
        default: false
    },
    awardsReceived: {
        type: Boolean,
        default: false
    },
    postsFollowed: {
        type: Boolean,
        default: false
    },
    commentsFollowed: {
        type: Boolean,
        default: false
    },
    trendingPosts: {
        type: Boolean,
        default: false
    },
    communityRecs: {
        type: Boolean,
        default: false
    },
    rereddit: {
        type: Boolean,
        default: false
    },
    featuredContents: {
        type: Boolean,
        default: false
    },
    redditAnnouncements: {
        type: Boolean,
        default: false
    },
    cakeDay: {
        type: Boolean,
        default: false
    },

    // emails
    privateMessagesEmail: {
        type: Boolean,
        default: false
    },
    chatRequesetsEmail: {
        type: Boolean,
        default: false
    },
    newUserWelcome: {
        type: Boolean,
        default: false
    },
    commentsOnPostsEmali: {
        type: Boolean,
        default: false
    },
    repliesToCommentsEmail: {
        type: Boolean,
        default: false
    },
    upvotesOnPostsEmail: {
        type: Boolean,
        default: false
    },
    upvotesOnCommentsEmail: {
        type: Boolean,
        default: false
    },
    mentionsOfUsernameEmail: {
        type: Boolean,
        default: false
    },
    newFollowersEmail: {
        type: Boolean,
        default: false
    },
    dailyDigest: {
        type: Boolean,
        default: false
    },
    unsubscribeFromAllEmails: {
        type: Boolean,
        default: false
    },
}, { strict: 'throw' });

const Settings = mongoose.model('Settings', settingsSchema);

module.exports = Settings;
