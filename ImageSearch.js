const http = require('http');
const MongoClient = require("mongodb").MongoClient;
const fs = require('fs');
const path = require('path');
const url = require('url');
var port = process.env.PORT || 8080;

const dbUrl = 'mongodb://localhost:27017';
const dbName = "test";
const dbCollectionName = "searches";


http.createServer(function(req, res){
	
	var timeOfRequest = new Date();
	var parsedUrl = url.parse(req.url);
	var urlPathName = parsedUrl.pathname;
	var urlQuery = parsedUrl.query;
	var urlDirName = path.dirname(urlPathName);
	var urlBaseName = "";
	var clientSearch = "";	  
	var recentSearchQueries = {};


	var returnedQuery = {
		url: "a",
		snippet: "b",
		thumbnail: "c",
		context: "d"
	}
	//have to validate the urlBaseName later
	//have to create validation test to the myOffset later
	
	if(urlDirName=="/api/imagesearch"){
		
	  var urlBaseName = path.basename(urlPathName);
	  var clientSearch = decodeURIComponent(urlBaseName); 
	  var recentSearchQueries = {
		term: clientSearch,
		when: timeOfRequest
	  }	  
		
	  MongoClient.connect(dbUrl, function(err, client){
		if(err) console.log("err");
		const db = client.db(dbName);
		const collection = db.collection(dbCollectionName);
		collection.insertOne(recentSearchQueries);
		client.close();
	  });
	  
	  //will return the searched images
	  res.writeHead(200, {'Content-Type':'text/plain'});
	  res.write(JSON.stringify(recentSearchQueries));
	  res.end();
	}
	if(urlDirName=="/api/latest"){
		MongoClient.connect(dbUrl, function(err, client){
		if(err) console.log("err");
		const db = client.db(dbName);
		const collection = db.collection(dbCollectionName);
        
		function response(){
		    collection.find({}, function(err, data){
			callback(null, data);
		  });
		}
		response(function(err, data){
			res.writeHead(200, {'Content-Type':'text/plain'});
			res.write(JSON.stringify(data));
			res.end();
		});
		client.close();
	  });
	}	
    else{
      res.writeHead(200, {'Content-Type':'text/plain'});
	  res.write("404: Page Not Found");
	  res.end();
	}
	
}).listen(port);












