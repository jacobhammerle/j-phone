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
  	const jayLucien = '';
  	const dawnHammerle = '5138872480';
  	const dougHammerle = '5138396035';
  	const tylerHammerle = '5138076802';
  	const allisonHammerle = '5133384761';
  	const samBaker = '2406717367';
  	const madelineMartini = '8597606566';

  	// for watching cron job and making sure things are running smoothly
	console.log(day);
	console.log(time);

  	const betaTesters = {
		[alecBorderkircher]: {
			Monday: '10:30 PM',
			Tuesday: '11:00 PM',
			Wednesday: '11:30 PM',
			Thursday: '9:30 PM',
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
			Monday: '11:00 PM',
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
		},
		[benKolde]: {
			Monday: '9:00 PM',
			Tuesday: '9:00 PM',
			Wednesday: '9:00 PM',
			Thursday: '9:00 PM',
			Friday: '9:00 PM'
		},
		[tylerHammerle]: {
			Monday: '6:30 PM',
			Tuesday: '6:30 PM',
			Wednesday: '6:30 PM',
			Thursday: '6:30 PM',
			Friday: '6:30 PM'
		},
		[dougHammerle]: {
			Monday: '7:00 PM',
			Tuesday: '7:00 PM',
			Wednesday: '7:00 PM',
			Thursday: '7:00 PM',
			Friday: '7:00 PM'	
		},
		[dawnHammerle]: {
			Monday: '3:00 PM',
			Tuesday: '3:00 PM',
			Wednesday: '3:00 PM',
			Thursday: '3:00 PM',
			Friday: '3:00 PM'	
		},
		[allisonHammerle]: {
			Monday: '8:00 PM',
			Tuesday: '8:00 PM',
			Wednesday: '8:00 PM',
			Thursday: '8:00 PM',
			Friday: '8:00 PM'	
		},
		[samBaker]: {
			Monday: '9:30 PM',
			Tuesday: '9:30 PM',
			Wednesday: '9:30 PM',
			Thursday: '9:30 PM',
			Friday: '9:30 PM'
		},
		[madelineMartini]: {
			Monday: '10:00 PM',
			Tuesday: '10:00 PM',
			Wednesday: '10:00 PM',
			Thursday: '6:00 PM',
			Friday: '6:00 PM'	
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
