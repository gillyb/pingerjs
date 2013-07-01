// ping utility for environments

var Pinger = require('./Pinger');
var dataAccess = require('./data_access.js');

Pinger.ping('uat.shopyourway.com', 'UAT').repeat(5000).responseCode(200)
	.on('failure', function() {
		dataAccess.reportStatus(this.name, this.host, 'failure');
	})
	.on('success', function() {
		dataAccess.reportStatus(this.name, this.host, 'success');
	});

Pinger.ping('pegasus.shopyourway.com', 'PEGASUS').repeat(5000).responseCode(200)
	.on('failure', function() {
		dataAccess.reportStatus(this.name, this.host, 'failure');
	})
	.on('success', function() {
		dataAccess.reportStatus(this.name, this.host, 'success');
	});

Pinger.ping('crux.shopyourway.com', 'CRUX').repeat(5000).responseCode(200)
	.on('failure', function() {
		dataAccess.reportStatus(this.name, this.host, 'failure');
	})
	.on('success', function() {
		dataAccess.reportStatus(this.name, this.host, 'success');
	});

Pinger.ping('orion.shopyourway.com', 'ORION').repeat(5000).responseCode(200)
	.on('failure', function() {
		dataAccess.reportStatus(this.name, this.host, 'failure');
	})
	.on('success', function() {
		dataAccess.reportStatus(this.name, this.host, 'success');
	});