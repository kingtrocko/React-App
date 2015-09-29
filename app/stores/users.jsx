var http = require('http');

exports.getUsers = function (callback) {

	http.get('/users', function (res) {
		res.on('data', function (chunk) {
			console.log('Body: ' + chunk);
			callback(null, chunk);
		});
	});

}