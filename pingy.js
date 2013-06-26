
// ping utility for environments

var Pinger = require('./Pinger');

//Pinger.ping('127.0.0.1').repeat(2000).assert().responseCode(200);

//Pinger.ping('127.0.0.1').repeat(5000).assert().regex('<body id="product-page">');

Pinger.ping('www.shopyourway.com', 'localhost').repeat(3000).responseCode(200);