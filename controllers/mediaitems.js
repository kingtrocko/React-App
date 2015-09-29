'use strict';
var pastebin = require('pastebin-js');
var googleTranslate = require('google-translate')('AIzaSyD8SaqoKbf2D2PNoi3Shwwi9l_mGJ-5zJ4');
var http = require('http');

var mongoose = require('mongoose');

exports.getVideoThumbnailURL = function (req, res) {

	var fullURL = 'http://www.dailymotion.com/services/oembed?url=http://www.dailymotion.com/embed/video/' + req.params.fullURL;

	var _res = res;

	http.get(fullURL, function(res) {
		res.on('data', function(chunk) {
			_res.send(chunk);
		});
	});
}

exports.getMediaItemsForPage = function (req, res) {
	var MediaItem = mongoose.model('MediaItem');
	MediaItem.find({
		'pageName': req.params.pageName,
		'classification': req.params.classification,
		'mediaType': req.params.mediaType
	}, null, {sort: {order: 1}} , function (err, mediaItems) {
		res.send(mediaItems);
	});
}

exports.getPrimaryMediaItemForPage = function (req, res) {
	var MediaItem = mongoose.model('MediaItem');
	MediaItem.findOne({
		'pageName': req.params.pageName,
		'classification': req.params.classification,
		'mediaType': req.params.mediaType,
		'priority': req.params.priority
	}, function (err, mediaItems) {
		res.send(mediaItems);
	});
}

exports.deleteAll = function (req, res) {
	var MediaItem = mongoose.model('MediaItem');
	MediaItem.remove({}, function (err) {
		if (!err) {
			res.send('archivos borrados');
		}
	});
}

exports.post = function (req, res) {

	var MediaItem = mongoose.model('MediaItem');
	if (req.method == 'POST') {
		var newMediaItem = new MediaItem({
			pageName: req.body.pageName,
			title: req.body.title,
			mediaType: req.body.mediaType,
			url: req.body.url,
			classification: req.body.classification,
			order: req.body.order,
			lyric: req.body.lyric,
			priority: req.body.priority
		});

		newMediaItem.save();
	}
	res.send('media item created');
}

exports.getAnyLyric = function (req, res) {
	var MediaItem = mongoose.model('MediaItem');
	MediaItem.findOne({'pageName':'Team #1 Page', 'classification':'Featured Chant'}, function (err, mediaItem) {
		res.send(mediaItem);
	});
}

exports.getPastebinLyric = function (req, res) {
	var pastebinID = req.params.pasteID;

	var paste = new pastebin({
	  'api_dev_key' : '5def9d8a7c94ef14c913587968364f06'
	});

	paste.getPaste(pastebinID).then(function (data) {
		res.send(data);
	}).fail(function (err) {
	    res.send(err);
	});
}
