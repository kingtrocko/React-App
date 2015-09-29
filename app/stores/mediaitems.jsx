//mediaitems.jsx Store
var http = require('http');
var querystring = require('querystring');

exports.getThumbnailLink = function(dmURL, callback) {

	if (dmURL != undefined && dmURL != "") {
		var id = dmURL.replace("https://www.dailymotion.com/video/", "");

		http.get('/mediaitemsvideo/' + id, function (res) {
			res.on('data', function (chunk) {
				callback(null, chunk);
			});
		});
	}
}

exports.getMediaItemsFor = function(pageName, classification, mediaType, callback) {
	http.get('/mediaitemsfor/' + pageName + '/' + classification + '/' + mediaType, function (res) {
		res.on('data', function (chunk) {
			callback(null, chunk);
		});
	});
}

exports.getPrimaryMediaItemFor = function(pageName, classification, mediaType, callback) {
	http.get('/mediaitemsfor/' + pageName + '/' + classification + '/' + mediaType + '/Primary' , function (res) {
		res.on('data', function (chunk) {
			callback(null, chunk);
		});
	});
}

exports.resetDatabaseFromExcelFile = function(workbook, callback) {

	console.log('entrada a reset database');

	var deleteOptions = {
		path: '/mediaitems/deleteAll',
		method: 'GET',
	};

	console.log('config delete options');

	http.get('/mediaitems/deleteAll', function (res) {
		res.on('data', function (chunk) {
			console.log('delete message: ' + chunk);

			for (var worksheet in workbook) {
				for (var entry in workbook[worksheet]) {

					var data = querystring.stringify({
						pageName: worksheet,
						title: workbook[worksheet][entry]['Video/Audio Title'],
						mediaType: workbook[worksheet][entry]['Media Type'],
						url: workbook[worksheet][entry]['URL'],
						classification: workbook[worksheet][entry]['Classification'],
						order: workbook[worksheet][entry]['Order'],
						lyric: workbook[worksheet][entry]['Lyric'],
						priority: workbook[worksheet][entry]['Priority']
					});

					var postOptions = {
						path: '/mediaitems',
						method: 'POST',
						headers: {
							'Content-Type': 'application/x-www-form-urlencoded',
						    'Content-Length': data.length
						}
					};

					var req = http.request(postOptions, function (response) {
						response.on('data', function (chunk) {
						});
					});
					req.write(data);
					req.end();
				}
			}

			if (callback) {
				callback();
			}
		});
	});
}

exports.getRandomLyric = function (callback) {

	http.get('/mediaitems/lyric', function(res) {
		res.on('data', function (chunk) {
			//console.log(chunk);
			callback(null, chunk);
		});
	});
}

exports.getLyricFromPastebin = function (pastebinURL, callback) {
	// http://pastebin.com/hku7VmWY
	var pasteID = pastebinURL.replace('http://pastebin.com/' , '');
	http.get('/mediaitems/lyric/' + pasteID, function (res) {
		res.on('data', function (chunk) {
			callback(null, chunk);
		});
	});
}











