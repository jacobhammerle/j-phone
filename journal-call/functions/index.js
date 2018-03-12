const functions = require('firebase-functions');
const requestCall = require('./request_call');

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions

exports.helloWorld = functions.https.onRequest((request, response) => {
  response.send("Hello from Firebase!");
});

exports.requestCall = functions.https.onRequest(requestCall);
