// ping utility for environments

var Pinger = require('./Pinger');
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/pingyjs');
require('./models.js');
PingSchema = mongoose.model('Ping');

function reportPingResult(status, host, name) {
	var pingStatus = new PingSchema({ 
		host: host,
		environment: name,
		status: status=='success' ? true : false
	});
	pingStatus.save(function(err) {
		if (err)
			console.log('Error saving ping output : ' + err);
	});
}

Pinger.ping('uat.shopyourway.com', 'UAT').repeat(5000).responseCode(200)
	.on('failure', function() {
		reportPingResult('failure', this.host, this.name);
	})
	.on('success', function() {
		reportPingResult('success', this.host, this.name);
	});

Pinger.ping('pegasus.shopyourway.com', 'PEGASUS').repeat(5000).responseCode(200)
	.on('failure', function() {
		reportPingResult('failure', this.host, this.name);
	})
	.on('success', function() {
		reportPingResult('success', this.host, this.name);
	});

Pinger.ping('crux.shopyourway.com', 'CRUX').repeat(5000).responseCode(200)
	.on('failure', function() {
		reportPingResult('failure', this.host, this.name);
	})
	.on('success', function() {
		reportPingResult('success', this.host, this.name);
	});

Pinger.ping('orion.shopyourway.com', 'ORION').repeat(5000).responseCode(200)
	.on('failure', function() {
		reportPingResult('failure', this.host, this.name);
	})
	.on('success', function() {
		reportPingResult('success', this.host, this.name);
	});