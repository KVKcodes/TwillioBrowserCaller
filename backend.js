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

app.post('/call', (req, res) => {
  const { To } = req.body;
  
  if (!To) {
    return res.status(400).send('To parameter is required');
  }
  
  const response = new twilio.twiml.VoiceResponse();
  response.dial({ callerId: process.env.twillio_phoneno }, To);
  res.type('text/xml');
  res.send(response.toString());
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
