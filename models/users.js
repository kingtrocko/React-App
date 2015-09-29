'use strict';

var mongoose = require('mongoose');

var UserSchema = mongoose.Schema({
	name: String
});

mongoose.model('User', UserSchema);