
var mongoose = require('mongoose');

var pingSchema = mongoose.Schema({
	host: String,
	environment: String,
	timestamp: { type:Number, default:function() { return new Date().getTime(); } },
	status: Boolean
});

mongoose.model('Ping', pingSchema);