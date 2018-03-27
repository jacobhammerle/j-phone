const admin = require('firebase-admin');
var functions = require('firebase-functions');
const serviceAccount = require('./service_account.json');
const requestCall = require('./request_call');

admin.initializeApp({
	credential: admin.credential.cert(serviceAccount),
	databaseURL: "https://j-phone-f984d.firebaseio.com/"
});

//exports.helloWorld = functions.https.onRequest((request, response) => {
  //response.send("Hello from Firebase!");
//});

exports.requestCall = functions.https.onRequest(requestCall);
