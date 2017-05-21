/**
 * Created by anupm on 5/20/2017.
 */
var express = require('express');
var app = express();
var jwt = require('express-jwt');
var jwtAuthz = require('express-jwt-authz');
var jwksRsa = require('jwks-rsa');
var cors = require('cors');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');


//Connect to MongoDb Database
mongoose.connect('mongodb://anup:Mothermary99@ds143151.mlab.com:43151/amst');
var db = mongoose.connection;

var authLogin;

app.use(bodyParser.json());



require('dotenv').config();

if (!process.env.AUTH0_DOMAIN || !process.env.AUTH0_AUDIENCE) {
    throw 'Make sure you have AUTH0_DOMAIN, and AUTH0_AUDIENCE in your .env file'
}

app.use(cors());

var checkJwt = jwt({
    // Dynamically provide a signing key based on the kid in the header and the singing keys provided by the JWKS endpoint.
    secret: jwksRsa.expressJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: 'https://'+process.env.AUTH0_DOMAIN+'/.well-known/jwks.json'
    }),

    // Validate the audience and the issuer.
    audience: process.env.AUTH0_AUDIENCE,
    issuer: 'https://'+process.env.AUTH0_DOMAIN+'/',
    algorithms: ['RS256']
});

var checkScopes = jwtAuthz([ 'read:messages' ]);

app.get('/api/public', function(req, res) {
    res.json({ message: "Hello from a public endpoint! You don't need to be authenticated to see this." });
});

app.get('/api/private', checkJwt, checkScopes, function(req, res) {
    res.json({ message: "Hello from a private endpoint! You need to be authenticated and have a scope of read:messages to see this." });
});

app.listen(3001);
console.log('Listening on http://localhost:3001');