const http = require('http');
const MongoClient = require("mongodb").MongoClient;
const fs = require('fs');
const path = require('path');
var port = process.env.PORT || 8080;

http.createServer(function(req, res){
	
	var response = [];
	
	var returnedQuery = {
		url: "a",
		snippet: "b",
		thumbnail: "c",
		context: "d"
	}
	
	var recentSearchQueries = {
		term: "A",
		when: "B",
	}
	
}).listen(port);












