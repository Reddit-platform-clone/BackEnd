const mongoose = require('mongoose');

const settingsSchema = new mongoose.Schema({
    // account settings
    optIntoBeta: Boolean,
    optOutRedesign: Boolean,

    // privacy and security
    showInSearch: Boolean,
    personalizeAds: Boolean,
    alcohol: Boolean,
    dating: Boolean,
    gambling: Boolean,
    pregnancyAndParenting: Boolean,
    weightLoss: Boolean,
    twoFactorAuthentication: Boolean,

    // feed settings
    showMatureContent: Boolean,
    blurMatureContent: Boolean,
    enableHomeFeedRecs: Boolean,
    autoPlay: Boolean,
    reduceAnimations: Boolean,
    communityThemes: Boolean,
    communityContentSort: {
        type: String,
        enum: ['hot', 'new', 'top', 'rising']
    },
    rememberPerCommunity: Boolean,
    globalContentView: {
        type: String,
        enum: ['card', 'classic', 'compact']
    },
    rememberPerCommunityView: Boolean,
    openPostsInNewWindow: Boolean,
    defaultToMarkdown: Boolean,

    // notifications
    privateMessages: Boolean,
    chatMessages: Boolean,
    chatRequesets: Boolean,
    mentionsOfUsername: Boolean,
    commentsOnPosts: Boolean,
    upvotesOnPosts: Boolean,
    upvotesOnComments: Boolean,
    repliesToComments: Boolean,
    activityOnComments: Boolean,
    activityOnChatPosts: Boolean,
    newFollowers: Boolean,
    awardsReceived: Boolean,
    postsFollowed: Boolean,
    commentsFollowed: Boolean,
    trendingPosts: Boolean,
    communityRecs: Boolean,
    rereddit: Boolean,
    featuredContents: Boolean,
    redditAnnouncements: Boolean,
    cakeDay: Boolean,

    // emails
    privateMessagesEmail: Boolean,
    chatRequesetsEmail: Boolean,
    newUserWelcome: Boolean,
    commentsOnPostsEmali: Boolean,
    repliesToCommentsEmail: Boolean,
    upvotesOnPostsEmail: Boolean,
    upvotesOnCommentsEmail: Boolean,
    mentionsOfUsernameEmail: Boolean,
    newFollowersEmail: Boolean,
    dailyDigest: Boolean,
    unsubscribeFromAllEmails: Boolean,
});

const Settings = mongoose.model('Settings', settingsSchema);

module.exports = Settings;
