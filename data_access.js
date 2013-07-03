
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

			if (results.length == 0) {
				callback.call(this, buildStatus(env, false, null));
				return;
			}

			var envStatus = results[0];

			if (envStatus.status == false)
				PingSchema.find()
					.where('environment').equals(env)
					.where('status').equals(true)
					.sort('timestamp')
					.limit(1)
					.exec(function(error, result) {
						var lastUpDate = (result && result[0] && result[0].timestamp) ? result[0].timestamp : null;
						callback.call(this, buildStatus(env, envStatus.status, lastUpDate));
					});
			else
				callback.call(this, buildStatus(env, envStatus.status, ''));

		});
};

exports.reportStatus = function(env, host, status) {
	var pingStatus = new PingSchema({ 
		host: host,
		environment: env,
		status: status == 'success' ? true : false
	});
	pingStatus.save(function(err) {
		if (err)
			console.log('Error saving ping output : ' + err);
	});
};

exports.deleteOldData = function(timestamp) {
	PingSchema.find({ timestamp: { $lte: timestamp } }, function(err, docs) {
		docs.forEach(function (element) {
			PingSchema.remove({ _id: element._id }).exec();
		});
	});
};

function buildStatus(env, status, lastUpDate) {
	return {
		environment: env,
		status: status,
		lastUpDate: lastUpDate
	};
}