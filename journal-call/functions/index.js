const functions = require('firebase-functions');
const requestCall = require('./request_call');
const serviceAccount = require('./serviceAccount.json');

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions

exports.helloWorld = functions.https.onRequest((request, response) => {
  response.send("Twilio Call Fire");
});

exports.requestCall = functions.https.onRequest(requestCall);
