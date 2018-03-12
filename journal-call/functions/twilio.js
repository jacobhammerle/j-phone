const twilio = require('twilio');

const accountSid = 'ACae32bd0d972e37384bb43b10b916245c';
const authToken = '2dbdb7fb0056cb95f4847b48bd335ced';

module.exports = new twilio.Twilio(accountSid, authToken);