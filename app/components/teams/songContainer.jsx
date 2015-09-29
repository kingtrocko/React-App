'use strict';

var React = require('react');
var MediaItemsStore = require('../../stores/mediaitems.jsx');
var googleTranslate = require('google-translate')('AIzaSyD8SaqoKbf2D2PNoi3Shwwi9l_mGJ-5zJ4');

module.exports = React.createClass({

	getInitialState: function() {
		return {
			lyric: '',
			lyricVariable: '',
			display: 'none',
			selectedLanguage: 'Original'
		};
	},

	componentWillReceiveProps: function(nextProps) {
		
		var widgetIframe = document.getElementById(nextProps.id),
		  	widget       = SC.Widget(widgetIframe);

	  	widget.bind(SC.Widget.Events.READY, function() {
			widget.bind(SC.Widget.Events.PLAY, function() {

				currentSoundcloudSong = this;
				if (mainGlobalVideoPlayer != null) {
					mainGlobalVideoPlayer.pause();
				}

			});
		});

  		this.setState({
  			display: 'none',
  			lyric: ''
  		});
	},

	componentDidMount: function() {
		var widgetIframe = document.getElementById(this.props.id),
    		widget       = SC.Widget(widgetIframe);

    	widget.bind(SC.Widget.Events.READY, function() {
  			widget.bind(SC.Widget.Events.PLAY, function() {

  				currentSoundcloudSong = this;
  				if (mainGlobalVideoPlayer != null) {
  					mainGlobalVideoPlayer.pause();
  				}

  			});
  		});		
	},

	toggleDisplay: function() {

		var _this = this;
		if (this.state.lyric == "") {
	  		if (this.props.lyricURL != "") {
	  			MediaItemsStore.getLyricFromPastebin(this.props.lyricURL, function (err, lyricText) {
					
					var formattedTranslation = lyricText.split('\n');
					for (var i = 0; i < formattedTranslation.length; i++) {
						formattedTranslation[i] += ' <br/>';
					}
					formattedTranslation = formattedTranslation.join(" ");

					_this.setState({
						lyric: formattedTranslation,
						lyricVariable: formattedTranslation
					});
		
				});
	  		}		
		}

		var displayStyle = (this.state.display == 'none') ? 'block' : 'none';
		this.setState({
			display: displayStyle
		});
	},

	handleDropClick: function(event) {
		event.preventDefault();

		var _this = this;
		var lang = event.target.attributes.value.value;
		var language = event.target.innerHTML;


		if (lang != 'original') {

			googleTranslate.translate(_this.state.lyric, lang, function (error, translation) {
				_this.setState({
					lyricVariable: translation.translatedText,
					selectedLanguage: language
				});
			});

		} else {
			_this.setState({
				lyricVariable: _this.state.lyric,
				selectedLanguage: 'Original'
			});
		}

	},

	render: function() {
		return (
			<div className="music-col col-sm-6 col-xs-12">
				<div className="responsive-music">
					<iframe id={this.props.id} scrolling="no" frameBorder="no" src={"https://w.soundcloud.com/player/?url=" + this.props.source + "&amp;auto_play=false&amp;hide_related=false&amp;show_comments=true&amp;show_user=true&amp;show_reposts=false&amp;visual=false"} ></iframe>
					<a href="javascript:void(0);" onClick={this.toggleDisplay} className="lyrics-link">Link to Lyrics</a>
					<div className="lyrics-container" style={{display: this.state.display}}>
						<p dangerouslySetInnerHTML={{__html: this.state.lyricVariable}} />
						
						<div className="change-lang">
							<span className="label">Language:</span>

							<div className="dropdown">
							    <button className="btn btn-show-lyric dropdown-toggle" type="button" data-toggle="dropdown" id={this.props.id} aria-expanded="true">
							      {this.state.selectedLanguage}
							      <span className="caret"></span>
							    </button>
							    <ul className="dropdown-menu" role="menu" aria-labelledby={this.props.id}>
									<li role="presentation"><a role="menuitem" tabIndex="-1" href="#" value="original" onClick={this.handleDropClick} >Original</a></li>
									<li role="presentation"><a role="menuitem" tabIndex="-1" href="#" value="en" onClick={this.handleDropClick}>English</a></li>
									<li role="presentation"><a role="menuitem" tabIndex="-1" href="#" value="es" onClick={this.handleDropClick}>Spanish</a></li>
									<li role="presentation"><a role="menuitem" tabIndex="-1" href="#" value="pt" onClick={this.handleDropClick}>Portuguese</a></li>
							    </ul>
							</div>

						</div>

					</div>
				</div>
			</div>
		);
	}
});