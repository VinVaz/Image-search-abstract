const http = require('http');
const MongoClient = require("mongodb").MongoClient;
const fs = require('fs');
const path = require('path');
const url = require('url');
var port = process.env.PORT || 8080;

http.createServer(function(req, res){
	
	var url = req.url;
	var offset = "";
	var termreq = "";
	

	
	var returnedQuery = {
		url: "a",
		snippet: "b",
		thumbnail: "c",
		context: "d"
	}
	var _term = url.parse(termreq);
	
	
	MongoClient.update({}, {}, function(date){
		
	});
    var response = [];
	var recentSearchQueries = {
		term: "A",
		when: "B",
	}
	for(var i = 0; i < 10, i++){
		
	}
	res.writeHead('Content-Type':'text/plain');
	res.write(JSON.parse(response));
	res.end();
	
}).listen(port);












