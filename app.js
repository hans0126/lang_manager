var express = require('express');
var bodyParser = require('body-parser');
var path = require("path");
var app = express();

global.appRoot = path.resolve(__dirname + '/frontend/');
app.use(express.static(global.appRoot));

//body parser
app.use(bodyParser());
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({
    extended: true
})); // support encoded bodies



var route = require('./routes.js')(app);

var server = app.listen(3000, function() {

    var host = server.address().address
    var port = server.address().port

    console.log("Example app listening at http://%s:%s", host, port)

})
