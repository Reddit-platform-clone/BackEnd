
require('dotenv').config();

const mongoose = require('mongoose');
const Community = require('../schemas/communitySchema');
require('dotenv').config();

console.log(process.env.MONGO_URI);

beforeAll(async () => {
  await mongoose.connect(process.env.MONGO_URI, {
  });
}, 20000);

describe('Community Schema Test', () => {});

  it('should be able to insert a community into the database', async () => {
    const communityData = {
        communityID: 1234,
        moderatorID: "radwa",
        moderatorInvite: false,
        rules: ["Don't do bad things", "Do good things"],
        members: ["radwa", "yusuf", "mariam"],
        subreddits: [123, 234, 345]
    };

    const community = new Community(communityData);
    const savedcommunity = await community.save();

    //const sortedExpected = communityData.members.slice().sort();
    //const sortedSaved = savedcommunity.members.slice().sort();

    expect(savedcommunity.communityID).toBeDefined();
    expect(savedcommunity.communityID).toBe(communityData.communityID);
    expect(savedcommunity.moderatorID).toBe(communityData.moderatorID);
    expect(savedcommunity.moderatorInvite).toBe(communityData.moderatorInvite);
    expect(savedcommunity.rules).toEqual(communityData.rules);
    expect(savedcommunity.members).toStrictEqual(communityData.members);
    expect(savedcommunity.subreddits).toStrictEqual(communityData.subreddits);
  }, 20000);

  it('should be able to retrieve all communities from the database', async () => {
    const communityData1 = {
        communityID: 1234,
        moderatorID: "radwa",
        moderatorInvite: false,
        rules: ["Don't do bad things", "Do good things"],
        members: ["radwa", "yusuf", "mariam"],
        subreddits: [123, 234, 345]
    };

    const communityData2 = {
        communityID: 5678,
        moderatorID: "farida",
        moderatorInvite: true,
        rules: ["Do bad things", "Don't do good things"],
        members: ["radwa", "akmal", "fatma"],
        subreddits: [566, 789, 543]
    };

    await Community.create(communityData1);
    await Community.create(communityData2);

    const communities = await Community.find({});
    expect(communities.length).toBe(2);
  }, 20000);

  it('should be able to retrieve community given community ID', async () => {
    const communityData = {
        communityID: 1234,
        moderatorID: "radwa",
        moderatorInvite: false,
        rules: ["Don't do bad things", "Do good things"],
        members: ["radwa", "yusuf", "mariam"],
        subreddits: [123, 234, 345]
    };

    await Community.create(communityData);

    const communityFound = await Community.findOne({communityID:'1234'});

    expect(communityFound.communityID).toBeDefined();
    expect(communityFound.communityID).toBe(communityData.communityID);
    expect(communityFound.moderatorID).toBe(communityData.moderatorID);
    expect(communityFound.moderatorInvite).toBe(communityData.moderatorInvite);
    expect(communityFound.rules).toEqual(communityData.rules);
    expect(communityFound.members).toStrictEqual(communityData.members);
    expect(communityFound.subreddits).toStrictEqual(communityData.subreddits);
  }, 20000);


  it('should be able to update community given community ID', async () => {
    const communityData = {
        communityID: 1234,
        moderatorID: "radwa",
        moderatorInvite: false,
        rules: ["Don't do bad things", "Do good things"],
        members: ["radwa", "yusuf", "mariam"],
        subreddits: [123, 234, 345]
    };

    await Community.create(communityData);

    const updates = {
        communityID: 1234,
        moderatorID: "winnie",
        moderatorInvite: false,
        rules: ["Do bad things"],
        members: ["radwa", "fatma", "akmal","yassin"],
        subreddits: [123, 234, 345]
    }

    const communityUpdated = await Community.findOneAndUpdate({ communityID: updates.communityID }, updates, { new: true });

    expect(communityUpdated.communityID).toBeDefined();
    expect(communityUpdated.communityID).toBe(updates.communityID);
    expect(communityUpdated.moderatorID).toBe(updates.moderatorID);
    expect(communityUpdated.moderatorInvite).toBe(updates.moderatorInvite);
    expect(communityUpdated.rules).toEqual(updates.rules);
    expect(communityUpdated.members).toStrictEqual(updates.members);
    expect(communityUpdated.subreddits).toStrictEqual(updates.subreddits);
  }, 20000);

  it('should be able to delete a community from the database', async () => {
    const community = {
        communityID: 1234,
        moderatorID: "radwa",
        moderatorInvite: false,
        rules: ["Don't do bad things", "Do good things"],
        members: ["radwa", "yusuf", "mariam"],
        subreddits: [123, 234, 345]
    };

    await Community.create(community);

    await Community.findOneAndDelete({ communityID: community.communityID }); 

    expect(await Community.findOne({ communityID: community.communityID })).toBe(null);
    }, 20000);


});

afterAll(async () => {
  await mongoose.connection.close();
}, 20000);
