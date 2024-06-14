const express = require('express');
const twilio = require('twilio');
const bodyParser = require('body-parser');
const path = require('path');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, 'public')));

const accountSid = process.env.accountSid; 
const authToken = process.env.authToken;   
const client = new twilio(accountSid, authToken);

app.get('/capability-token', (req, res) => {
  const capability = new twilio.jwt.ClientCapability({
    accountSid: accountSid,
    authToken: authToken,
  });

  capability.addScope(
    new twilio.jwt.ClientCapability.OutgoingClientScope({
      applicationSid: process.env.app_id,
    })
  );

  const token = capability.toJwt();
  res.send({ token: token, identity: 'client-name' });
});

app.post('/call', (req, res) => {
  const response = new twilio.twiml.VoiceResponse();
  response.dial({ callerId: process.env.twillio_phoneno }, req.body.To);
  res.type('text/xml');
  res.send(response.toString());
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
