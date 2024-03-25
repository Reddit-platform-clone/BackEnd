
require('dotenv').config();

const mongoose = require('mongoose');
const Communitty = require('../schemas/communitySchema');
require('dotenv').config();

console.log(process.env.MONGO_URI);

beforeAll(async () => {
  await mongoose.connect(process.env.MONGO_URI, {
  });
}, 20000);

describe('Community Schema Test', () => {
  beforeEach(async () => {
    await Community.deleteMany({});
  });

  it('should be able to insert a community into the database', async () => {
    const communityData = {
        communityID: '1234',
        moderatorID: "radwa",
        moderator_invite: false,
        rules: ["Don't do bad things", "Do good things"],
        members: ["radwa", "yusuf", "mariam"],
        subreddits: ['123', '234', '345']
    };

    const community = new Community(communityData);
    const savedcommunity = await community.save();

    expect(savedcommunity.communityID).toBeDefined();
    expect(savedcommunity.communityID).toBe(communityData.communityID);
    expect(savedcommunity.moderatorID).toBe(communityData.moderatorID);
    expect(savedcommunity.moderator_invite).toBe(communityData.moderator_invite);
    expect(savedcommunity.rules).toEqual(communityData.rules);
    expect(savedcommunity.members).toBe(communityData.members);
    expect(savedcommunity.subreddits).toBe(communityData.subreddits);
  }, 20000);

  it('should be able to retrieve all communities from the database', async () => {
    const communityData1 = {
        communityID: '1234',
        moderatorID: "radwa",
        moderator_invite: false,
        rules: ["Don't do bad things", "Do good things"],
        members: ["radwa", "yusuf", "mariam"],
        subreddits: ['123', '234', '345']
    };

    const communityData2 = {
        communityID: '5678',
        moderatorID: "farida",
        moderator_invite: true,
        rules: ["Do bad things", "Don't do good things"],
        members: ["radwa", "akmal", "fatma"],
        subreddits: ['566', '789', '543']
    };

    await Community.create(communityData1);
    await Community.create(communityData2);

    const communities = await Community.find({});
    expect(communities.length).toBe(2);
  }, 20000);

  it('should be able to retrieve community given community ID', async () => {
    const communityData = {
        communityID: '1234',
        moderatorID: "radwa",
        moderator_invite: false,
        rules: ["Don't do bad things", "Do good things"],
        members: ["radwa", "yusuf", "mariam"],
        subreddits: ['123', '234', '345']
    };

    await Community.create(communityData1);

    const communityFound = await Community.findOne({communityID:'1234'});

    expect(communityFound.communityID).toBeDefined();
    expect(communityFound.communityID).toBe(communityData.communityID);
    expect(communityFound.moderatorID).toBe(communityData.moderatorID);
    expect(communityFound.moderator_invite).toBe(communityData.moderator_invite);
    expect(communityFound.rules).toEqual(communityData.rules);
    expect(communityFound.members).toBe(communityData.members);
    expect(communityFound.subreddits).toBe(communityData.subreddits);
  }, 20000);


  it('should be able to update community given community ID', async () => {
    const communityData = {
        communityID: '1234',
        moderatorID: "radwa",
        moderator_invite: false,
        rules: ["Don't do bad things", "Do good things"],
        members: ["radwa", "yusuf", "mariam"],
        subreddits: ['123', '234', '345']
    };

    await Community.create(communityData1);

    const updates = {
        communityID: '1234',
        moderatorID: "winnie",
        moderator_invite: false,
        rules: ["Do bad things"],
        members: ["radwa", "fatma", "akmal","yassin"],
        subreddits: ['123', '234', '345']
    }

    const communityUpdated = await Community.findOneAndUpdate({ communityID: updates.communityID }, updates, { new: true });

    expect(communityUpdated.communityID).toBeDefined();
    expect(communityUpdated.communityID).toBe(updates.communityID);
    expect(communityUpdated.moderatorID).toBe(updates.moderatorID);
    expect(communityUpdated.moderator_invite).toBe(updates.moderator_invite);
    expect(communityUpdated.rules).toEqual(updates.rules);
    expect(communityUpdated.members).toBe(updates.members);
    expect(communityUpdated.subreddits).toBe(updates.subreddits);
  }, 20000);


});

afterAll(async () => {
  await mongoose.connection.close();
}, 20000);
