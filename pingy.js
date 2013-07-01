// ping utility for environments

var Pinger = require('./Pinger');
var dataAccess = require('./data_access.js');

var pingRate = 60000; // in seconds

Pinger.ping('uat.shopyourway.com', 'UAT').repeat(pingRate).responseCode(200)
	.on('failure', function() {
		dataAccess.reportStatus(this.name, this.host, 'failure');
	})
	.on('success', function() {
		dataAccess.reportStatus(this.name, this.host, 'success');
	});

Pinger.ping('pegasus.shopyourway.com', 'PEGASUS').repeat(pingRate).responseCode(200)
	.on('failure', function() {
		dataAccess.reportStatus(this.name, this.host, 'failure');
	})
	.on('success', function() {
		dataAccess.reportStatus(this.name, this.host, 'success');
	});

Pinger.ping('crux.shopyourway.com', 'CRUX').repeat(pingRate).responseCode(200)
	.on('failure', function() {
		dataAccess.reportStatus(this.name, this.host, 'failure');
	})
	.on('success', function() {
		dataAccess.reportStatus(this.name, this.host, 'success');
	});

Pinger.ping('orion.shopyourway.com', 'ORION').repeat(pingRate).responseCode(200)
	.on('failure', function() {
		dataAccess.reportStatus(this.name, this.host, 'failure');
	})
	.on('success', function() {
		dataAccess.reportStatus(this.name, this.host, 'success');
	});