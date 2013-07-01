// ping utility for environments

var Pinger = require('./Pinger');
var dataAccess = require('./data_access.js');


console.log('');
console.log('');
console.log('    PLEASE DO NOT CLOSE THIS WINDOW!!    ');
console.log('');
console.log('');


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

// delete old pings from the mongodb
setInterval(function() {
	var now = new Date().getTime();
	var oneMonthAgo = new Date(now - (1000 * 60 * 60 * 24 * 30)).getTime();
	dataAccess.deleteOldData(oneMonthAgo);
}, 1000); // once every hour