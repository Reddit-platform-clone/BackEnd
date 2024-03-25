
require('dotenv').config();

const mongoose = require('mongoose');
const Subreddit = require('../schemas/subredditSchema');
require('dotenv').config();

console.log(process.env.MONGO_URI);

beforeAll(async () => {
  await mongoose.connect(process.env.MONGO_URI, {
  });
}, 20000);

describe('Subreddit Schema Test', () => {
  beforeEach(async () => {
    await Subreddit.deleteMany({});
  });

  it('should be able to insert a subreddit into the database', async () => {
    const subredditData = {
        description: "test subreddit",
        subredditID: 1234,
        moderatorID: "radwa",
        communityID: 234,
        rules: ["Don't do bad things", "Do good things"],
        members: ["radwa", "yusuf", "mariam"],
        banned: ["hamada"]

    };

    const subreddit = new Subreddit(subredditData);
    const savedsubreddit = await subreddit.save();

    expect(savedsubreddit.subredditID).toBeDefined();
    expect(savedsubreddit.subredditID).toBe(subredditData.subredditID);
    expect(savedsubreddit.moderatorID).toBe(subredditData.moderatorID);
    expect(savedsubreddit.moderatorInvite).toBe(subredditData.moderatorInvite);
    expect(savedsubreddit.rules).toEqual(subredditData.rules);
    expect(savedsubreddit.members).toStrictEqual(subredditData.members);
    expect(savedsubreddit.subreddits).toStrictEqual(subredditData.subreddits);
  }, 20000);

  it('should be able to retrieve all subreddits from the database', async () => {
    const subredditData1 = {
        description: "test subreddit",
        subredditID: 3678,
        moderatorID: "radwa",
        communityID: 345,
        rules: ["Don't do bad things", "Do good things"],
        members: ["radwa", "yusuf", "mariam"],
        banned: ["hamada"]
    };

    const subredditData2 = {
        description: "test subreddit 2",
        subredditID: 5678,
        moderatorID: "farida",
        communityID: 123,
        rules: ["Do bad things", "Don't do good things"],
        members: ["radwa", "akmal", "fatma"],
        banned: ["hamada"]
    };

    await Subreddit.create(subredditData1);
    await Subreddit.create(subredditData2);

    const communities = await Subreddit.find({});
    expect(communities.length).toBe(2);
  }, 20000);

  it('should be able to retrieve subreddit given subreddit ID', async () => {
    const subredditData = {
        description: "test subreddit",
        subredditID: 1234,
        moderatorID: "radwa",
        communityID: 567,
        rules: ["Don't do bad things", "Do good things"],
        members: ["radwa", "yusuf", "mariam"],
        banned: ["hamada"]

    };

    await Subreddit.create(subredditData);

    const subredditFound = await Subreddit.findOne({subredditID:'1234'});

    expect(subredditFound.subredditID).toBeDefined();
    expect(subredditFound.subredditID).toBe(subredditData.subredditID);
    expect(subredditFound.moderatorID).toBe(subredditData.moderatorID);
    expect(subredditFound.moderatorInvite).toBe(subredditData.moderatorInvite);
    expect(subredditFound.rules).toEqual(subredditData.rules);
    expect(subredditFound.members).toStrictEqual(subredditData.members);
    expect(subredditFound.subreddits).toStrictEqual(subredditData.subreddits);
  }, 20000);


  it('should be able to update subreddit given subreddit ID', async () => {
    const subredditData = {
        description: "test subreddit",
        subredditID: 1234,
        moderatorID: "radwa",
        communityID: 456,
        rules: ["Don't do bad things", "Do good things"],
        members: ["radwa", "yusuf", "mariam"],
        banned: ["hamada"]

    };

    await Subreddit.create(subredditData);

    const updates = {
        description: "test subreddit",
        subredditID: 1234,
        moderatorID: "winnie",
        communityID: 678,
        rules: ["Do bad things"],
        members: ["radwa", "fatma", "akmal","yassin"],
        banned: ["hamada"]
    }

    const subredditUpdated = await Subreddit.findOneAndUpdate({ subredditID: updates.subredditID }, updates, { new: true });

    expect(subredditUpdated.subredditID).toBeDefined();
    expect(subredditUpdated.subredditID).toBe(updates.subredditID);
    expect(subredditUpdated.moderatorID).toBe(updates.moderatorID);
    expect(subredditUpdated.moderatorInvite).toBe(updates.moderatorInvite);
    expect(subredditUpdated.rules).toEqual(updates.rules);
    expect(subredditUpdated.members).toStrictEqual(updates.members);
    expect(subredditUpdated.subreddits).toStrictEqual(updates.subreddits);
  }, 20000);

  it('should be able to delete a subreddit from the database', async () => {
    const subreddit = {
        description: "test subreddit",
        subredditID: 1234,
        moderatorID: "radwa",
        communityID: 367,
        rules: ["Don't do bad things", "Do good things"],
        members: ["radwa", "yusuf", "mariam"],
        banned: ["hamada"]

    };

    await Subreddit.create(subreddit);

    await Subreddit.findOneAndDelete({ subredditID: subreddit.subredditID }); 

    expect(await Subreddit.findOne({ subredditID: subreddit.subredditID })).toBe(null);
    }, 20000);


});

afterAll(async () => {
  await mongoose.connection.close();
}, 20000);
