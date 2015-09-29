// Audio Common Controller

'use strict';

var http = require('http');

exports.getTrackList = function (req,res) {

	var AudioCommonURL = 'http://www.audiocommon.com/api/apiDiscover/GetPlaylist?version=bein';
	var _res = res;

	http.get(AudioCommonURL, function (res) {
		res.on('data', function (chunk) {
			_res.send(chunk);
		});
	});
}

exports.getTrackInfo = function (req,res) {

	var AudioCommonURL = 'http://www.audiocommon.com/api/apiDiscover/GetPublicSong/' + req.params.trackID;
	var _res = res;

	http.get(AudioCommonURL, function (res) {
		res.on('data', function (chunk) {
			_res.send(chunk);
		});
	});
}