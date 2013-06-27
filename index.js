
var mongoose = require('mongoose');
var express = require('express');
var app = express();

mongoose.connect('mongodb://localhost/pingyjs');
require('./models.js');
PingSchema = mongoose.model('Ping');

app.configure(function() {
	app.set('view engine', 'jade');
	app.set('views', __dirname + '/views');
	app.use(express.static(__dirname + '/public'));
	app.use(express.static(__dirname + '/css'));
	app.use(express.static(__dirname + '/img'));
	app.use(app.router);
});

app.get('/', function(request, response) {
	var envStatus = buildEnvironmentStatus();
	response.render('index', { environmentsStatus: envStatus });
});

function buildEnvironmentStatus() {
	var environmentsStatus = [];
	var environments = ['UAT', 'PEGASUS', 'ORION', 'CRUX'];
	environments.forEach(function(env, ind) {
		var lastUpDate;
		PingSchema.find()
			.where('environment').equals(env)
			.sort('timestamp')
			.limit(1)
			.exec(function(err, results) {
				var envStatus = results[0];
				// if (envStatus.status == false)
				// 	lastUpDate = PingSchema.find({environment:env}).where('status').equals(true).sort(timestamp);
				environmentsStatus.push({
					environment: env,
					status: envStatus.status,
					lastUpDate: lastUpDate
				});
			});
	});
	return environmentsStatus;
}

app.listen('8080');