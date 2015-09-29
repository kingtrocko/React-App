var http 		= require('http');
var querystring = require('querystring');


exports.getContributionsCollection = function(callback) {
	http.get('/submissions/getAllFanContributions', function (res) {
		res.on('data', function (chunk) {
			callback(null, chunk);
		});
	});
}

exports.updateStatus = function(docId, status, callback){
	http.get('/submissions/setStatus/' + docId + '/' + status, function(res){
		res.on('data', function (result){
			callback(null, result);
		});
	});
}

exports.createSubmission = function(submission, callback) {

	var data = querystring.stringify({
		type: submission.type,
		name: submission.name,
		artist: submission.artist,
		team: submission.team,
		file_url: submission.file_url,
		file_type: submission.file_type,
		file_size: submission.file_size,
		lyric: submission.lyric,
		status: ''
	});

	var postOptions = {
		path: '/submissions',
		method: 'POST',
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded',
		    'Content-Length': data.length
		}
	};

	var req = http.request(postOptions, function (response) {
		response.on('data', function (chunk) {
			//console.log('submission sent by server:', chunk);
		});
	});
	req.write(data);
	req.end();

	if (callback) {
		callback();
	}

}

