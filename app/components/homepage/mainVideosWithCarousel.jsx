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
		var div = $('#top-carousel').find('.item.active');
		div.html('<div class="responsive-video"><div id="dailymotion-main-video-player"></div></div>');
		//div.attr("data-hasDMvideo", "yes");

		var mainVideoID = this.props.sourceUrl.replace('https://www.dailymotion.com/video/', '').trim();
		var iframe_div = $('#top-carousel').find('.item.active').find("#dailymotion-main-video-player");
		var mainVideoPlayer = DM.player(iframe_div.get(0), {video: mainVideoID});

		mainVideoPlayer.addEventListener('play', onMainPlayerStart, false);
		mainGlobalVideoPlayer = mainVideoPlayer;

		document.body.scrollTop = document.documentElement.scrollTop = 130;

		//Remove carouse previous and next buttons
    	$('.left.carousel-control').remove();
    	$('.right.carousel-control').remove();
	},

	componentDidMount: function() {
		var _this = this;
		var sourceID = _this.props.sourceUrl.replace("https://www.dailymotion.com/video/", "").trim();
		var link = 'https://api.dailymotion.com/video/' + sourceID + '?fields=thumbnail_url';
		$.get(link, function (data) {
			_this.setState({ thumbnail: data.thumbnail_url });
		});
	},

	render: function() {
		return (
			<div data-video-name={this.props.videoName} data-index={this.props.index} className={"responsive-image item " + this.props.cssActiveClass}>
	            <a href="#" onClick={this.handleClick} >
					<div className="ico-play"><i className="fa fa-play"></i></div>
					<img src={this.state.thumbnail} />
				</a>
			</div>
		);
	}
});