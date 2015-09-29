var http = require('http');
var querystring = require('querystring');

exports.createContribution = function(contribution, callback) {

	var data = querystring.stringify({
		type: contribution.type,
		name: contribution.name,
		artist: contribution.artist,
		team: contribution.team,
		file_url: contribution.file_url,
		file_type: contribution.file_type,
		file_size: contribution.file_size,
		lyric: contribution.lyric,
		status: ''
	});

	var postOptions = {
		path: '/contributions',
		method: 'POST',
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded',
		    'Content-Length': data.length
		}
	};

	var req = http.request(postOptions, function (response) {
		response.on('data', function (chunk) {
			//console.log('contribution sent by server:', chunk);
		});
	});
	req.write(data);
	req.end();

	if (callback) {
		callback();
	}

}