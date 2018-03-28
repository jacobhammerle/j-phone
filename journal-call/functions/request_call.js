const admin = require('firebase-admin')
const twilio = require('./twilio')

module.exports = (req, res) => {

  if (!req.body.phone) {
    return res.status(422).send({ error: 'You must provide a phone number' })
  }

  const phone = String(req.body.phone).replace(/[^\d]/g, '')

	var url = 'https://demo.twilio.com/welcome/voice/';
	
	twilio.calls.create({
		to: phone,
		from: '+18598881609',
		url: url,
		CallerName: 'Journal',
		record: 'true'
	}, err => {
	    if (err) { return res.status(422).send(err) }
	    /*
	    const VoiceResponse = require('twilio').twiml.VoiceResponse;

		const response = new VoiceResponse();
		response.say({
		    voice: 'alice',
		    language: 'en'
		},
			'Tell me about your day'
		);

		console.log(response.toString());
		*/
	    admin.database().ref(`phone/${phone}`)
	      .update({ phone, codeValid: true }, () => {
	        res.send({ success: true })
	      })
	  })
}