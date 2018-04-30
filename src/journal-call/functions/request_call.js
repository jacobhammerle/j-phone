const admin = require('firebase-admin')
const twilio = require('./twilio')

module.exports = (req, res) => {

	const day = 'Monday';
	const time = '10:30';

  	const alecBorderkircher = '9379035483';
  	const jacobHammerle = '5133327583';
  	const seanKing = '8478997326';
  	const benKolde = '';

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
		},
		[seanKing]: {
			Monday: '10:00',
			Tuesday: '10:00',
			Wednesday: '10:00',
			Thursday: '10:00',
			Friday: '10:00'
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
			    if (err) { return res.status(422).send(err) }

			    res.send({ success: true })
			})

	  }
	});

    const phone = String(req.body.phone).replace(/[^\d]/g, '')
	
}



/*
module.exports = (req, res) => {

  if (!req.body.phone) {
    return res.status(422).send({ error: 'You must provide a phone number' })
  }

  const phone = String(req.body.phone).replace(/[^\d]/g, '')

	var url = 'https://j-phone-f984d.firebaseapp.com/twilio.xml';

	twilio.calls.create({
		to: '5133327583',
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
}
*/