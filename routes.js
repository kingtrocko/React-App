'use strict';

var MediaItemsController = require('./controllers/mediaitems');
var UsersController = require('./controllers/users');
var AudioCommonController = require('./controllers/audiocommon');
var SubmissionsController = require('./controllers/submissions.js');
var ContributionsController = require('./controllers/contribution');

// exports = module.expo....
module.exports = function (app) {

	//Users Routes
	app.get('/users', UsersController.index);

	//Media Items Routes
	//app.get('/mediaitems', MediaItemsController.index);
	app.get('/mediaitems/any-lyric', MediaItemsController.getAnyLyric);
	app.post('/mediaitems', MediaItemsController.post);
	app.get('/mediaitems/deleteAll', MediaItemsController.deleteAll);
	//app.get('/mediaitems/lyric', MediaItemsController.getPastebinLyric);
	app.get('/mediaitems/lyric/:pasteID', MediaItemsController.getPastebinLyric);
	app.get('/mediaitemsFor/:pageName/:classification/:mediaType', MediaItemsController.getMediaItemsForPage);
	app.get('/mediaitemsFor/:pageName/:classification/:mediaType/:priority', MediaItemsController.getPrimaryMediaItemForPage);
	app.get('/mediaitemsvideo/:fullURL', MediaItemsController.getVideoThumbnailURL);

	//Audio Common Routes
	app.get('/audiocommon/tracklist', AudioCommonController.getTrackList);
	app.get('/audiocommon/track/:trackID', AudioCommonController.getTrackInfo);

	//Submissions Routes
	app.get('/submissions/getAllFanContributions', SubmissionsController.getAllSubmissions);
	app.get('/submissions/setStatus/:id/:status', SubmissionsController.setSubmittionStatus);
	app.post('/submissions', SubmissionsController.postSubmission);

	//Contributions Routes
	app.post('/contributions', ContributionsController.postContribution);
}