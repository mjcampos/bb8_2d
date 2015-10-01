var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var app = express();

app.use(express.static(path.join(__dirname, "./client")));
app.use(bodyParser.json());

require('./config/mongoose.js');
// require('./config/routes.js')(app);

app.listen(8000, function() {
	console.log("Program active");
})