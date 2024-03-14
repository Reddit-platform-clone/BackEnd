const mongoose = require('mongoose');
const Message = require('../models/messageModel.js');


beforeAll(async () => {
  await mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
  });
});


describe('Message Model Test', () => {
  
  beforeEach(async () => {
    await Message.deleteMany({});
  });

 
  it('should be able to insert a message into the database', async () => {
    const messageData = {
      messageID: '12345',
      senderID: 'sender123',
      receiverID: 'receiver456',
      dateTime: new Date(),
      status: 'sent'
    };

    const message = new Message(messageData);
    const savedMessage = await message.save();

    expect(savedMessage._id).toBeDefined();
    expect(savedMessage.messageID).toBe(messageData.messageID);
    expect(savedMessage.senderID).toBe(messageData.senderID);
    expect(savedMessage.receiverID).toBe(messageData.receiverID);
    expect(savedMessage.dateTime).toEqual(messageData.dateTime);
    expect(savedMessage.status).toBe(messageData.status);
  });


  it('should be able to retrieve all messages from the database', async () => {
    const messageData1 = {
      messageID: '12345',
      senderID: 'sender123',
      receiverID: 'receiver456',
      dateTime: new Date(),
      status: 'sent'
    };

    const messageData2 = {
      messageID: '67890',
      senderID: 'sender456',
      receiverID: 'receiver789',
      dateTime: new Date(),
      status: 'delivered'
    };

    await Message.create(messageData1);
    await Message.create(messageData2);

    const messages = await Message.find({});
    expect(messages.length).toBe(2);
  });
});


afterAll(async () => {
  await mongoose.connection.close();
});
