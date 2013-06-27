// ping utility for environments

var Pinger = require('./Pinger');
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/pingyjs');
var pingSchema = mongoose.Schema({
	host: String,
	environment: String,
	timestamp: { type:Number, default:function() { return new Date().getTime(); } },
	status: Boolean
});
var PingSchema = mongoose.model('Ping', pingSchema);

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

Pinger.ping('www.shopyourway.com', 'localhost')
	.repeat(3000)
	.responseCode(200)
	.on('failure', function() {
		reportPingResult('failure', this.host, this.name);
	})
	.on('success', function() {
		reportPingResult('success', this.host, this.name);
	});

Pinger.ping('uat.shopyourway.com', 'uat').repeat(2000).responseCode(200).on('failure', function() { console.log('uat failure'); }).on('success', function() { console.log('uat success'); });
