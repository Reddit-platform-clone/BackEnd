const mongoose = require('mongoose');
const Message = require('../models/messageModel.js');
require('dotenv').config();

console.log(process.env.MONGO_URI);

beforeAll(async () => {
  await mongoose.connect(process.env.MONGO_URI, {
  });
}, 30000);

describe('Message Model Test', () => {
  
  beforeEach(async () => {
    
  });

  it('should be able to insert a message into the database', async () => {
    const messageData = {
      recipient: 'sender123',
      username: 'receiver456',
      dateTime: new Date(),
      status: 'sent',
      title: 'ss',
      content: 'sss'
    };

    const message = new Message(messageData);
    const savedMessage = await message.save();

    expect(savedMessage._id).toBeDefined();
    
    expect(savedMessage.recipient).toBe(messageData.recipient);
    expect(savedMessage.username).toBe(messageData.username);
    expect(savedMessage.dateTime).toEqual(messageData.dateTime);
    expect(savedMessage.status).toBe(messageData.status);
    expect(savedMessage.title).toBe(messageData.title);
    expect(savedMessage.content).toBe(messageData.content);
  }, 20000);

  it('should be able to retrieve all messages from the database', async () => {
    const messageData1 = {
      recipient: 'sender123',
      username: 'receiver456',
      dateTime: new Date(),
      status: 'sent', 
      title: 'ss',
      content: 'sss'
    };

    const messageData2 = {
      recipient: 'sender456',
      username: 'receiver789',
      dateTime: new Date(),
      status: 'delivered',
      title: 'ss',
      content: 'sss'
    };

    // await Message.create(messageData1);
    // await Message.create(messageData2);
    const message = new Message(messageData1);
    const savedMessage = await message.save();
    const message2 = new Message(messageData2);
    const savedMessage2 = await message2.save();

    const messages = await Message.find({});
    expect(messages.length).toBe(2);
  }, 30000);
});

afterAll(async () => {
  await mongoose.connection.close();
}, 20000);
