'use strict'

var http 				= require('http');
var mongoose			= require('mongoose');

exports.getAllSubmissions = function (req, res) {
	var SubmissionsModel 	= mongoose.model('Submissions');
	SubmissionsModel.find({}, function (err, entries){
		res.send(entries);
	});
}

exports.setSubmittionStatus = function(req, res){
	var SubmissionsModel 	= mongoose.model('Submissions');
		var docId = req.params.id;
		var statusId = req.params.status; // 1: Approved, 2: Not Approved
		var docStatus = statusId == 1 ? "Approved" : "Not Approved";

		SubmissionsModel.findByIdAndUpdate(docId, { $set: {status: docStatus} }, {new: true},
			function(err, doc){
				if(err){
					res.send("ERROR");
				}
				else{
					res.send(doc["status"]);
				}
			}
		);
}

exports.postSubmission = function (req, res) {

	var Submission = mongoose.model('Submissions');
	var newSubmission = new Submission(req.body);
	newSubmission.save();
	res.send(newSubmission);
}