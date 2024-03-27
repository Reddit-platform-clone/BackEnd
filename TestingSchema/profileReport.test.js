const mongoose = require('mongoose');
const Report = require('../models/profileReportModel.js');
require('dotenv').config();

beforeAll(async () => {
  await mongoose.connect(process.env.MONGO_URI);
}, 20000);

describe('Report Model Test', () => {
  beforeEach(async () => {
    await Report.deleteMany({});
  });

  it('Insert a report into the database', async () => {
    const reportData = {
        reporterUsername: 'user1',
        reportedUsername: 'user2',
        reason: ['spam'],
        description: 'This is spam',
        date_time: new Date(),
    };

    const report = new Report(reportData);
    const savedReport = await report.save();

    expect(savedReport._id).toBeDefined();
    expect(savedReport.reporterUsername).toBe(reportData.reporterUsername);
    expect(savedReport.reportedUsername).toBe(reportData.reportedUsername);
    expect(savedReport.reason.toObject()).toEqual(reportData.reason);
    expect(savedReport.description).toBe(reportData.description);
  }, 20000);

    it('Retrieve all reports from the database', async () => {
        const reportData1 = {
            reporterUsername: 'user1',
            reportedUsername: 'user2',
            reason: ['spam'],
            description: 'This is spam',
            date_time: new Date(),
        };
    
        const reportData2 = {
            reporterUsername: 'user3',
            reportedUsername: 'user4',
            reason: ['harassment'],
            description: 'This is harassment',
            date_time: new Date(),
        };
    
        await Report.create(reportData1, reportData2);
    
        const foundReports = await Report.find({});
        expect(foundReports.length).toEqual(2);
    }, 20000);
}, 20000);

afterAll(async () => {
  await mongoose.connection.close();
}, 20000);