const admin = require('firebase-admin');
const functions = require('firebase-functions');
const serviceAccount = require('./service_account.json');
const requestCall = require('./request_call');
const twilio = require('./twilio');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://j-phone-f984d.firebaseio.com"
});

exports.minute_job =
  functions.pubsub.topic('every-minute').onPublish((event) => {
    //console.log("This job is ran every minute!")
    const phone = '5133327583'

	var url = 'https://j-phone-f984d.firebaseapp.com/twilio.xml';

	twilio.calls.create({
		to: phone,
		from: '+18598881609',
		url: url,
		CallerName: 'Journal',
		record: 'true'
	}, err => {
	    if (err) { return res.status(422).send(err) }
	    
	    admin.database().ref(`phone/${phone}`)
	      .update({ phone, codeValid: true }, () => {
	        res.send({ success: true })
	      })
	  })
 });

exports.requestCall = functions.https.onRequest(requestCall);
