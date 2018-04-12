const http = require('http');
const MongoClient = require("mongodb").MongoClient;
const fs = require('fs');
const path = require('path');
const url = require('url');
var port = process.env.PORT || 8080;

const dbUrl = 'mongodb://localhost:27017';
const dbName = "test";
const dbCollectionName = "searchs";


http.createServer(function(req, res){
	
	var timeOfRequest = new Date();
	var parsedUrl = url.parse(req.url);
	var pathName = parsedUrl.pathname;
	var myOffset = parsedUrl.query;
	var urlBaseName = path.basename(pathName);
	var urlDirName = path.dirname(pathName);
	var _term = decodeURIComponent(urlBaseName);
	
	var returnedQuery = {
		url: "a",
		snippet: "b",
		thumbnail: "c",
		context: "d"
	}
	console.log(req.url);
	var recentSearchQueries = {
		term: _term,
		when: timeOfRequest
	}
	
	MongoClient.connect(dbUrl, function(err, client){
		if(err) console.log("err");
		var db = client.db(dbName);
		var collection = db.collection(dbCollectionName);
		collection.insertOne(recentSearchQueries);
		client.close();
	});
	
	res.writeHead(200, {'Content-Type':'text/plain'});
	res.write(JSON.stringify(recentSearchQueries));
	res.end();
	
}).listen(port);












