
var mongoose = require('mongoose');
var express = require('express');
var app = express();
var data = require('./data.js');

app.configure(function() {
	app.set('view engine', 'jade');
	app.set('views', __dirname + '/views');
	app.use(express.static(__dirname + '/public'));
	app.use(express.static(__dirname + '/css'));
	app.use(express.static(__dirname + '/img'));
	app.use(app.router);
});

app.get('/', function(request, response) {
	
	var environmentsStatus = [];
	var environments = ['UAT', 'PEGASUS', 'ORION', 'CRUX'];
	var waiting = 0;
	environments.forEach(function(env, ind) {
		waiting++;

		data.getEnvironmentStatus(env, function(data) {
			environmentsStatus.push(data);
			if (--waiting == 0) {
				console.log(environmentsStatus);
				response.render('index', { environmentsStatus: environmentsStatus });
			}
		});

	});
});

app.listen('8080');