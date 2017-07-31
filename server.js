require('dotenv').config();

// grab dependancies
const express = require('express');
const app = express();
const port = process.env.PORT || 8080;
const mongoose = require('mongoose');
const expressLayouts = require('express-ejs-layouts');

const AWS = require('aws-sdk');

const bodyParser = require('body-parser');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const flash = require('connect-flash');

// configure aws region
AWS.config.loadFromPath('../config.json');
AWS.config.update({region:'us-west-2'});

// load modules
const ip = require('./app/aws.js');


// configure our application #################################

// tell express where to look for  static assets
app.use(express.static(__dirname + "/public"));

// middleware body parsing for dealing with creating events
app.use(bodyParser.urlencoded({ extended: true }));

//// set ejs as out templating engine
app.set('view engine', 'ejs');
app.use(expressLayouts);


// setting up flash messages
app.use(cookieParser());
app.use(session({
    secret: process.env.SECRET,
    cookie: { maxAge: 60000 },
    resave: false,
    saveUninitialized: false
}));
app.use(flash());

// connect to our database
mongoose.connect(process.env.DB_URI, {
    useMongoClient: true
});

// set the routes ###############################
app.use(require('./app/routes'));


// start our server
app.listen(port, ip.getPrivateIp, () =>{
    console.log('App listening on http://dynamicIP:' + port);
})
