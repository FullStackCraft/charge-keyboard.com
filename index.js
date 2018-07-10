'use strict';

var http = require('http');
const express = require('express');
const morgan = require('morgan');
const path = require('path');
var cors = require('cors')
const app = express();
const nodemailer = require('nodemailer');
var oBodyParser = require('body-parser');
var oServer = http.createServer(app);
var fs = require('fs');
var oCorsOptions = {
  origin: ['http://charge-keyboard.com', 'http://localhost:3000']
}
app.use(cors(oCorsOptions));

let oTransporter = nodemailer.createTransport({
 service: 'gmail',
 auth: {
        user: 'frewin.christopher@gmail.com',
        pass: process.env.GMAIL_PASSWORD
    }
});
let oMailOptions = {
  from: 'frewin.christopher@gmail.com', // sender address
  to: 'frewin.christopher@gmail.com, dervishi.de@gmail.com, benjaminpetroski@gmail.com' // list of receivers
};

// oBodyParser to get posts from $.ajax
app.use(oBodyParser.json());

// Setup logger
app.use(morgan(':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] :response-time ms'));

app.post('/email', (req, res) => {
  console.log(req.body);
  oMailOptions.subject = 'Charge Keyboard - New email interest from the Charge Keyboard Homepage message box!'; // Subject line
  oMailOptions.html = "Email: " + req.body.sEmail; // plain text body
  console.log(oMailOptions);
  oTransporter.sendMail(oMailOptions, function (err, info) {
     if (err) {
       console.log(err);
     } else {
       console.log(info);
     }
  });
  fs.appendFile('emails.txt', req.body.sEmail + '\n', function (err) {
    if (err) throw err;
    console.log('Saved!');
  });
  res.sendStatus(200); // everything OK
});

// Serve static assets
app.use(express.static('./build'));

// listening ports - reverse proxyed from nginx nlp-champs.com
oServer.listen(8086); // chrisfrew.in productions - charge-keyboard.com is fixed at 8085