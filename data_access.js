
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/pingyjs');
require('./models.js');
PingSchema = mongoose.model('Ping');

exports.getEnvironmentStatus = function(env, callback) {

	PingSchema.find()
		.where('environment').equals(env)
		.sort('timestamp')
		.limit(1)
		.exec(function(err, results) {

			var envStatus = results[0];

			if (envStatus.status == false)
				PingSchema.find()
					.where('environment').equals(env)
					.where('status').equals(true)
					.sort('timestamp')
					.limit(1)
					.exec(function(error, result) {
						var lastUpDate = (result && result[0] && result[0].timestamp) ? result[0].timestamp : null;
						callback(buildStatus(env, envStatus.status, lastUpDate));
					});
			else
				callback(buildStatus(env, envStatus.status, ''));

		});

};

function buildStatus(env, status, lastUpDate) {
	return {
		environment: env,
		status: status,
		lastUpDate: lastUpDate
	};
}