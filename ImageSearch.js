"use strict";

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

	/*to prevent unauthorized access to the database  
	 *urlBaseName shall not contain any of the 
	 *special character and must not be an object
	 */
	function validadeBeforeDatabase(string){
		return (/[\$:\{\}]/g).test(string);
	}
	
	function getOffsetNum(string){
		var regex = /offset=([0-9]+)/;
		var isOffsetValid = regex.test(string);
		if(isOffsetValid){
			return string.replace(regex, '$1')
		}
		else return null;
	} 
	

	if(urlDirName=="/api/imagesearch"){
	  var urlBaseName = path.basename(urlPathName);
	  console.log(urlBaseName);
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
	  /////////////////////////////////////////////////////////////////
	  //use a searcher's API to get images
	  var returnedQuery = {
		url: "a",
		snippet: "b",
		thumbnail: "c",
		context: "d"
	  }
	  //will return the searched images
	  res.writeHead(200, {'Content-Type':'text/plain'});
	  res.write(JSON.stringify(recentSearchQueries));
	  res.end();
	  /////////////////////////////////////////////////////////////////
	}
	else if(urlPathName=="/api/latest"){
		MongoClient.connect(dbUrl, function(err, client){
		  if(err) console.log("err");
		  const db = client.db(dbName);
		  const collection = db.collection(dbCollectionName);
        
		  var lastSearch = new Promise(function(resolve, reject){
	        collection.find({}, {projection: {_id: 0}}).sort({_id: -1}).limit(2).toArray(function(err, data){
			  //reject(err);
			  resolve(data);
		    }); 
		  });
		  lastSearch.then(function(data){
			res.writeHead(200, {'Content-Type':'text/plain'});
			res.write(JSON.stringify(data));
			res.end();
		  });
		  client.close();
	    });
	}	
    else{
      res.writeHead(200, {'Content-Type':'text/plain'});
	  res.write("404: Not Found");
	  res.end();
	}
}).listen(port);












