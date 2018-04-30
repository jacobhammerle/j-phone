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

  	const dayOfWeek = new Date(date).getDay();
	return isNaN(dayOfWeek) ? null : ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'][dayOfWeek];

  	const alecBorderkircher = '9379035483';
  	const jacobHammerle = '5133327583';

  	const betaTesters = {
		[alecBorderkircher]: {
			Monday: '10:30',
			Tuesday: '11:00',
			Wednesday: '11:30',
			Thursday: '9:30',
			Friday: '9:45'
		},
		[jacobHammerle]: {
			Monday: '10:30',
			Tuesday: '11:00',
			Wednesday: '11:30',
			Thursday: '9:30',
			Friday: '9:45'
		}
	}

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
