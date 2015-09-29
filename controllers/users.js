'use strict';

var mongoose = require('mongoose');
var User = mongoose.model('User');

exports.index = function (req, res) {
	User.find(function (err, users) {
		res.send(users);
	});
}
