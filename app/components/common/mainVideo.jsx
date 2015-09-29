'use strict';

var React = require('react');
var MediaItemsStore = require('../../stores/mediaitems.jsx');

module.exports = React.createClass({

	getInitialState: function() {
		return {
			thumbnail: ''
		};
	},

	handleClick: function() {
		var div = document.getElementById("top-carousel");
		div.innerHTML = '<div class="responsive-video"><div id="dailymotion-main-video-player"></div></div>';

		var mainVideoID = this.props.video.url.replace('https://www.dailymotion.com/video/', '').trim();
		var iframe_div = document.getElementById("dailymotion-main-video-player");
		var mainVideoPlayer = DM.player(iframe_div, {video: mainVideoID});

		mainVideoPlayer.addEventListener('play', onMainPlayerStart, false);
		mainGlobalVideoPlayer = mainVideoPlayer;

		document.body.scrollTop = document.documentElement.scrollTop = 130;
	},

	componentWillReceiveProps: function(nextProps) {
	    var _this = this;
		var sourceID = nextProps.video.url.replace("https://www.dailymotion.com/video/", "").trim();
		var link = 'https://api.dailymotion.com/video/' + sourceID + '?fields=thumbnail_url';
		$.get(link, function (data) {
			_this.setState({ thumbnail: data.thumbnail_url });
		});
	},

	componentDidMount: function() {
	    var _this = this;
	    if (_this.props.video.url != "") {
	    	var sourceID = _this.props.video.url.replace("https://www.dailymotion.com/video/", "").trim();
			var link = 'https://api.dailymotion.com/video/' + sourceID + '?fields=thumbnail_url';
			$.get(link, function (data) {
				_this.setState({ thumbnail: data.thumbnail_url });
			});
	    }
	},

	render: function() {
		return (
			<div className="main-video-window" id="top-carousel">
				<a href={window.location.hash} onClick={this.handleClick} id="main-daily-motion-video" className="responsive-image">
					<div className="ico-play"><i className="fa fa-play"></i></div>
					<img src={this.state.thumbnail} />
				</a>
			</div>
		);
	}
});