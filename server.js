var express = require("express");
var path = require("path");
var app = express();
var request = require("request");
var bodyParser = require("body-parser");
var axios = require("axios"); //promise based http library
var cheerio = require("cheerio"); //server side Jquery
// var PythonShell = require('python-shell');
var PORT = process.env.PORT || 3000;

app.listen(PORT, function() {
	console.log("App running on port " + PORT + "!");
});

app.use(bodyParser.urlencoded({ extended: false })); 


//==================================Routes=========================================




app.get("/:ticker", function(req, res) {

	var ticker = req.params;

	const appKey = "2s6bv57phxdxetkxhry3zupk"
	const timeSeries = "qtr" //ttm" monthly
	const numberTime = "20"

const https = require('https');

https.get("http://edgaronline.api.mashery.com/v2/corefinancials/" + timeSeries + "?primarysymbols=" + ticker + "&numperiods=" + numberTime + "&appkey=" + appKey,
	 (resp) => {
		let data = '';

  // A chunk of data has been recieved.
  resp.on('data', (chunk) => {
  	data += chunk;
  });

  // The whole response has been received. Print out the result.
  resp.on('end', () => {
  	console.log(JSON.parse(data).explanation);
  	res.send(data)
  });

  

}).on("error", (err) => {
	console.log("Error: " + err.message);
});


});