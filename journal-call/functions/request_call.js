const admin = require('firebase-admin')
const twilio = require('./twilio')

module.exports = (req, res) => {

  if (!req.body.phone) {
    return res.status(422).send({ error: 'You must provide a phone number' })
  }

  const phone = String(req.body.phone).replace(/[^\d]/g, '')

	/*twilio.messages.create({
	    body: `This is yo boy Jacob`,
	    to: phone,
	    from: '+18598881609'
	  }, err => {
	    if (err) { return res.status(422).send(err) }

	    admin.database().ref(`phone/${phone}`)
	      .update({ phone, codeValid: true }, () => {
	        res.send({ success: true })
	      })
	  })
	  */

	var url = 'https://api.twilio.com/2010-04-01/Accounts/ACae32bd0d972e37384bb43b10b916245c/' + encodeURIComponent(phone)

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
}