'use strict';

var mongoose = require('mongoose');

var ContributionSchema = mongoose.Schema({
	type: String,
	name: String,
	artist: String,
	team: String,
	file_url: String,
	file_type: String,
	file_size: Number,
	lyric: String,
	status: String
});

mongoose.model('Contribution', ContributionSchema);