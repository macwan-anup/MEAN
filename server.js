/**
 * Created by anupm on 5/12/2017.
 */
//Express
var express = require('express');
var app = express();

var path = require('path');

//app.use(express.static('public'))
// serve angular front end files from root path
app.use('/', express.static('app', { redirect: false }));

// rewrite virtual urls to angular app to enable refreshing of internal pages
app.get('*', function (req, res, next) {
    res.sendFile(path.join(__dirname + '/index.html'));
});



app.listen(3000);
console.log("Server Started.. ");
console.log("listening on port 3000");
