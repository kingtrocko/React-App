'use strict';

var mongoose = require('mongoose');

var MediaItemSchema = mongoose.Schema({
	pageName: String,
	title: String,
	mediaType: String,
	url: String,
	classification: String,
	order: Number,
	lyric: String,
	priority: String
});

mongoose.model('MediaItem', MediaItemSchema);