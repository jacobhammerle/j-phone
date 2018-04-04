const admin = require('firebase-admin');
const functions = require('firebase-functions');
const serviceAccount = require('./service_account.json');
const requestCall = require('./request_call');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://j-phone-f984d.firebaseio.com"
});

exports.requestCall = functions.https.onRequest(requestCall);
