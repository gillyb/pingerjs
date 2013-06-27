// ping utility for environments

var Pinger = require('./Pinger');

Pinger.ping('www.shopyourway.com', 'localhost').repeat(3000).responseCode(200).on('failure', function() { console.log('prod failure'); }).on('success', function() { console.log('prod success' + this.host); });

Pinger.ping('uat.shopyourway.com', 'uat').repeat(2000).responseCode(200).on('failure', function() { console.log('uat failure'); }).on('success', function() { console.log('uat success'); });
