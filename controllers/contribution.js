'use strict';

var http = require('http');
var mongoose = require('mongoose');

exports.postContribution = function (req, res) {

	var Contribution = mongoose.model('Contribution');
	var newContribution = new Contribution(req.body);
	newContribution.save();
	res.send(newContribution);
}