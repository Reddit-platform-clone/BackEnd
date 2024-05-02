const Community = require('../models/communityModel.js');
const User = require('../models/userModel.js');
const Post = require('../models/postModel.js')
const cloudinary = require('../utils/cloudinary.js'); 

function shuffleArray(array){
    for(let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
};

const communityService = {
    join: async (username, communityName) => {
        try {
            const user = await User.findOne({ username: username });
            if (!user) {
                return {success: false, error: 'user not found'};
            }

            const community = await Community.findOne({ communityName: communityName });
            if(!community) {
                throw new Error('Community not found');
            }

            if(!community.members){
                community.members = [];
            }

            if (community.members.includes(username)) {
                return { success: false, message: 'User is already a member'};
            } else {
                community.members.push(username);
                await community.save()
            }

            user.joinedCommunities.push(communityName);
            await user.save();
            return {success: true, message: 'User joined community successfully'};
        } catch (error) {
            return {success: false, message: error.message};
        }
    },

    leave: async (username, communityName) => {
        try {
            const user = await User.findOne({ username: username });
            if (!user) {
                return { success: false, error: 'User not found' };
            }
    
            const community = await Community.findOne({ communityName: communityName });
            if (!community) {
                throw new Error('Community not found');
            }
    
            if (!community.members || !community.members.includes(username)) {
                return { success: false, error: 'User is not a member of this community' };
            }
    
            // Remove the user from the community's members
            community.members = community.members.filter(member => member !== username);
            await community.save();
    
            // Remove the community from the user's joinedCommunities
            user.joinedCommunities = user.joinedCommunities.filter(community => community !== communityName);
            await user.save();
    
            return { success: true, message: 'User left community successfully' };
        } catch (error) {
            return { success: false, message: error.message };
        }
    },
    
    listCommunities: async (category = null) => {
        try {
            let query = {};
            if (category !== null) {
                category = category.toLowerCase();
                query = { communityCategory: category }; // Filter communities by category if provided
            }
    
            const communities = await Community.find(query);
            return communities;
        } catch (error) {
            console.error('Error fetching communities', error);
            throw new Error('Failed to fetch communities');
        }
    },

    create: async (username, communityData) => {
        
        communityData.communityCategory = communityData.communityCategory.map(category => category.toLowerCase());
        try {

            //const displayPicUpload = await cloudinary.uploader.upload(displayPic.path);
            //communityData.displayPicUrl = displayPic

            // const backgroundPicUpload = await cloudinary.uploader.upload(backgroundPic.path);
            // communityData.backgroundPicUrl = backgroundPic

            console.log(communityData)
            const existingCommunity = await Community.findOne({ communityName: communityData.communityName })
            if (existingCommunity) {
                return { success: false, message: 'Community name already exists' };
            }

            const newCommunity = new Community(communityData);
            await newCommunity.save();

            return { success: true, message: 'Community created successfully'};
        } catch (error) {
            return { success: false, message: error.message };
        }
    }, 

    commuintyPosts: async(communityName) => {
        try {
            const existingCommunity = await Community.findOne({communityName: communityName}).populate('posts', '_id')
            if (!existingCommunity) {
                return {success: false, message: 'community doesnot exist'}
            }

            const postIds = existingCommunity.posts.map(post => post._id)
            const posts = await Post.find({ _id: {$in: postIds}})
            return {success: true, data: posts}
        } catch (error) {
            console.error("Error fetching posts from community: ", error);
            throw new Error("Failed to fetch posts from community")
        }
    },
    
    listCommunitiesNotJoined: async (username) => {
        
        try {
            
            // Find the user by ID
            const user = await User.findOne({username: username});
            if (!user) {
                throw new Error('User not found');
            }

            console.log(username)
            // Get the IDs of communities joined by the user
            const joinedCommunitiesNames = user.joinedCommunities;
            // Find communities that the user has not joined
            const communitiesNotJoined = await Community.find({ communityName: { $nin: joinedCommunitiesNames } });
            console.log(communitiesNotJoined);

            return communitiesNotJoined
        } catch (error) {
            throw new Error('Failed to fetch communities not joined by user');
        }
    },

    listCommunitiesJoined: async (username) => {
        try {
            
            // Find the user by ID
            const user = await User.findOne({username: username});
            if (!user) {
                throw new Error('User not found');
            }

            console.log(username)
            // Get the IDs of communities joined by the user
            const joinedCommunitiesNames = user.joinedCommunities;
            console.log(joinedCommunitiesNames);

            const communitiesJoined = await Community.find({ communityName: { $in: joinedCommunitiesNames } });

            return communitiesJoined;
        } catch (error) {
            throw new Error('Failed to fetch communities not joined by user');
        }    
    }, 

    getCommunityInfo: async (postId) => {
        try {
            const post = await Post.findOne({_id: postId});
            if (!post) {
                throw new Error('Post not found');
            }

            const community = await Community.findOne({ communityName: post.communityId });
            console.log(community);
            if (!community) {
                throw new Error('Community not found');
            }

            return { success: true, data: community}
        } catch (error) {
            throw new Error(`Error getting community info: ${error.message}`);
        } 
    }, 

    getCommunityInfoByName: async (communityName) => {
        try {
            const community = await Community.findOne({communityName: communityName});
            if (!community) {
                throw new Error('Post not found');
            }
            console.log(community);

            return { success: true, data: community}
        } catch (error) {
            throw new Error(`Error getting community info: ${error.message}`);
        } 
    }, 

    

    getRandomCommunities: async () => {
        try {
            const communities = await Community.find();
            const RandomCommunities = shuffleArray(communities);
            return RandomCommunities;
        } catch (error) {
            console.error('Error fetching communities', error);
            throw new Error('Failed to fetch communities');
        }
    }
};

module.exports = communityService;