const admin = require('firebase-admin');
const functions = require('firebase-functions');
const serviceAccount = require('./service_account.json');
const requestCall = require('./request_call');
const twilio = require('./twilio');
var moment = require('moment-timezone');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://j-phone-f984d.firebaseio.com"
});

exports.minute_job =
  functions.pubsub.topic('every-minute').onPublish((event) => {

  	const day = moment().utcOffset('-0400').format('dddd');
	const time = moment().utcOffset('-0400').format('LT');

  	const alecBorderkircher = '9379035483';
  	const jacobHammerle = '5133327583';
  	const seanKing = '8478997326';
  	const michaelWatchmaker = '9259517715';
  	const benKolde = '5133357411';

  	// for watching cron job and making sure things are running smoothly
	console.log(day);
	console.log(time);

  	const betaTesters = {
		[alecBorderkircher]: {
			Monday: '10:30 PM',
			Tuesday: '11:00 PM',
			Wednesday: '11:30 PM',
			Thursday: '9:30pm',
			Friday: '9:45 PM'
		},
		[jacobHammerle]: {
			Monday: '3:31 PM',
			Tuesday: '11:00 PM',
			Wednesday: '11:30 PM',
			Thursday: '9:30 PM',
			Friday: '9:45 PM'
		},
		[seanKing]: {
			Monday: '10:00 PM',
			Tuesday: '10:00 PM',
			Wednesday: '10:00 PM',
			Thursday: '10:00 PM',
			Friday: '10:00 PM'
		},
		[michaelWatchmaker]: {
			Monday: '5:30 PM',
			Tuesday: '8:00 PM',
			Wednesday: '5:30 PM',
			Thursday: '5:30 PM',
			Friday: '5:30 PM'
		}
	}

	const keys = Object.keys(betaTesters)

	keys.forEach(key => {
	  if (betaTesters[key][day] === time) {

			var url = 'https://j-phone-f984d.firebaseapp.com/twilio.xml';
			
			twilio.calls.create({
				to: key,
				from: '+18598881609',
				url: url,
				CallerName: 'Journal',
				record: 'true'
			}, err => {
			    if (err) { return 'error' }

			    return 'call fired'
			})

			return 'call fired'

	  }else{

		return 'no calls to be sent'

	  }
	});

	return 'no calls to be sent'
 });

exports.requestCall = functions.https.onRequest(requestCall);
