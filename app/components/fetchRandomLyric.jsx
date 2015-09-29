"use strict";
var http = require('http');
var googleTranslate = require('google-translate')('AIzaSyD8SaqoKbf2D2PNoi3Shwwi9l_mGJ-5zJ4');

var React = require('react');
var Lyric = require('./lyric.jsx');

var MediaItemsStore = require('../stores/mediaitems.jsx');

module.exports = React.createClass({
	displayName: 'FetchRandomLyric',

	getInitialState: function() {
		return {
			lyric: 'Song Lyric',
			lyricTranslated: 'Letra de Cancion'
		};
	},

	handleClick: function() {

		var _this = this;
		MediaItemsStore.getRandomLyric(function (err, lyricText) {
			//console.log(lyricText);
			var formattedTranslation = lyricText.split('\n');
			for (var i = 0; i < formattedTranslation.length; i++) {
				formattedTranslation[i] += ' <br/>';
			}
			formattedTranslation = formattedTranslation.join(" ");

			googleTranslate.translate(formattedTranslation, 'en', 'es', function (error, translation) {
			  //console.log(translation.translatedText);
				_this.setState({
					lyric: lyricText,
					lyricTranslated: translation.translatedText
				});
			});		
		});

		// var google_key = 'AIzaSyD8SaqoKbf2D2PNoi3Shwwi9l_mGJ-5zJ4';
		// var translateUrl = https://www.googleapis.com/language/translate/v2?key= + google_key + &source=en&target=es&callback=translateText&q= + this.state.lyric
		// https://developer.dailymotion.com/documentation#player-oembed
		// Daily motion request
		// http://www.dailymotion.com/services/oembed?url=<VIDEO_URL>
	},


	render: function() {
		return (
			<div style={{display: this.props.display}}>
				<input type='button' value='Fetch Random Lyric' onClick={this.handleClick} className='btn btn-primary' /> <br/><br/>

				<div className="row">
					<div className="col-md-6">
						<pre> {this.state.lyric} </pre>
					</div>
					<div className="col-md-6">
						<p dangerouslySetInnerHTML={{__html: this.state.lyricTranslated}} />
					</div>
				</div>

				<div>
					<iframe src="http://www.dailymotion.com/embed/video/x2naryi" width="480" height="203" frameborder="0" allowfullscreen></iframe>
				</div>
			</div>
		);
	}
});