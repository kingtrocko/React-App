// AudioCommon Store

var http = require('http');

exports.getTrackList = function (callback) {

	http.get('/audiocommon/tracklist', function (res) {
		res.on('data', function (chunk) {
			callback(null, chunk);
		});
	});
}

exports.getTrackInfo = function (trackID, callback) {

	http.get('/audiocommon/track/' + trackID, function (res) {
		res.on('data', function (chunk) {
			callback(null, chunk);
		});
	});
}